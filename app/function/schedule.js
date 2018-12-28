const { Op } = require("sequelize");
module.exports = function({ model }) {
    // let User = model.use('user');
    let Schedule = model.use('schedule');
    let Describe = model.use('describe');
    let search = async function({ date, id }) {
        let studentDescribe = await Describe.findOne({ where: { uid: id }, attributes: ['studentCode', 'studentName'] });
        if (!studentDescribe) return [];
        let student = studentDescribe.get({ plain: true });

        let scheduleNow = await Schedule.findAll({
            where: {
                [Op.and]: {
                    studentCode: student.studentCode,
                    day: date
                }
            }
        });
        return scheduleNow.map(e => e.get({ plain: true }));

    }
    return {
        getDateNow: function() {
            let now = new Date();
            let month = now.getMonth() + 1 + '';
            let day = now.getDate() + '';
            let year = now.getFullYear();

            day = day.length < 2 ? '0' + day : day;
            month = month.length < 2 ? '0' + month : month;
            return `${day}/${month}/${year}`
        },
        search

    }
}
