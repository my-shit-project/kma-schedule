const express = require("express");
const router = express.Router();
const fs = require("fs");
const multer = require("multer");
const parseSchedule = require("parse-schedule-kma");

function getExtensionFromFileName(filename) {
    return filename.match(/^([^\\]*)\.(\w+)$/)[2]
}
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload')
    },
    filename: function(req, file, cb) {
        return cb(null, file.originalname);
    }
})
const fileFilter = function fileFilter(req, file, cb) {

    let extension = getExtensionFromFileName(file.originalname);
    if (extension == 'xls' || extension == 'xlsx') return cb(null, true);
    else return cb(null, false)


}
const upload = multer({ storage, fileFilter });

module.exports = function({ passport, model }) {
    let Describe = model.use('describe');
    let Schedule = model.use('schedule');

    router.post('/', upload.single('schedule'), function(req, res) {

        let supportFile = ["xls", "xlsx"]
        if (!req.isAuthenticated()) return res.redirect(`/?noti=${encodeURI('Chưa đăng nhập!')}`);
        if (!req.file) return res.redirect(`/?noti=${encodeURI('Vui lòng tải lên file hợp lệ!')}`);
        let dataSchedule = parseSchedule(fs.readFileSync(`${req.file.path}`));
        if (!dataSchedule.studentCode) return res.redirect(`/?noti=${encodeURI('Không phải thời khóa biểu của học viện!')}`);
        // res.json(dataSchedule);
        Describe.findOrCreate({
            where: {
                uid: req.user.id
            },
            defaults: {
                studentCode: dataSchedule.studentCode,
                studentName: dataSchedule.studentName
            }
        });
        
        Promise.all(dataSchedule.scheduleData.map(schedule => Schedule.findOrCreate({
            where: Object.assign({ studentCode: dataSchedule.studentCode }, schedule),
            defaults: {}
        })))
        res.redirect(`/?noti=${encodeURI('Cập nhật thời khóa biểu thành công!')}`);
        fs.unlinkSync(`./${req.file.path}`);

    })
    return router;
}
