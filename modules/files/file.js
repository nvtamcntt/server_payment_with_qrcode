
'use strict';

const multer = require('multer');

const FileConfig = require('./../config').files;
const File = require('./../db/schema/file');
const FileController = require('./../core').FileController;

module.exports = () => {
    const app = this.app;
    const authMiddlewares = this.middlewares.auth;

    if (!FileConfig.enable) {
        return;
    }

    FileController.on('files:new', (file, room, user) => {
        const fileObj = file.toJSON();
        fileObj.owner = user;
        fileObj.room = room.toJSON(user);

        app.io.to(room._id).emit('files:new', fileObj);
    });

    const fileUpload = multer({
        limits: {
            files: 1,
            fileSize: FileConfig.maxFileSize
        },
        storage: multer.diskStorage({})
    }).any();

    //
    // Routes
    //
    app.route('/files')
        .all(authMiddlewares.verifyToken)
        .get((req) => {
            req.io.route('files:list');
        })
        .post(fileUpload, this.middlewares.cleanupFiles, (req) => {
            req.io.route('files:create');
        });

    app.route('/rooms/:room/files')
        .all(authMiddlewares.verifyToken, this.middlewares.room)
        .get((req) => {
            req.io.route('files:list');
        })
        .post(fileUpload, this.middlewares.cleanupFiles, (req) => {
            req.io.route('files:create');
        });

    app.route('/files/:id/:name')
        .all(authMiddlewares.verifyToken)
        .get((req, res) => {
            File.findById(req.params.id, (err, file) => {
                if (err) {
                    // Error
                    return res.send(400);
                }

                const url = FileController.getUrl(file);
                res.sendFile(url, {
                    headers: {
                        'Content-Type': file.type,
                        'Content-Disposition': 'attachment'
                    }
                });

            });
        });
};
