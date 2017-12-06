const fs = require('fs')
const path = require('path')
/**
 *  create date to sql (mysql)
 *  auth : zzqiang009@foxmail.com
 */
function createSql (name) {
  let bean
  let sql = ' DROP TABLE IF EXISTS `dict_district_' + name + '`;' +
    ' CREATE TABLE `dict_district_' + name +
    '` ( ' +
    '  `id` int(11) NOT NULL AUTO_INCREMENT,\n' +
    '  `code` varchar(10) DEFAULT NULL,\n' +
    '  `name` varchar(80) DEFAULT NULL,\n' +
    '  `parent_code` varchar(10) DEFAULT NULL,\n' +
    '  PRIMARY KEY (`id`)\n' +
    ') ENGINE=InnoDB AUTO_INCREMENT=2856 DEFAULT CHARSET=utf8;\n'
  bean = fs.readFile(path.join(__dirname, `../dist/${name}.json`), {encoding: 'utf-8'}, function (err, bytesRead) {
    if (err) throw err
    const bean = JSON.parse(bytesRead.toString())
    console.log(bean.length)
    bean.forEach(node => {
      console.log(node.name)
      if (node.code.length === 2) {
        node.code += '0000'
      }
      if (node.code.length === 4) {
        node.code += '00'
      }
      if (node.parent_code === undefined) {
        node.parent_code = ''
      }
      if (node.parent_code.length === 2) {
        node.parent_code += '0000'
      }
      if (node.parent_code.length === 4) {
        node.parent_code += '00'
      }
      sql += 'insert into dict_district_' + name + ' (`code`,`name`,`parent_code`) values (\'' + node.code + '\',\'' + node.name + '\',\'' + node.parent_code + '\' );\n'
    })
    console.log(sql)
    fs.writeFileSync(path.resolve(__dirname, `../dist/${name}.sql`), sql)
  })
  console.log(__dirname)
  if (bean == null) { console.log('error,no file is found!') }
}
createSql('areas')
createSql('cities')
createSql('provinces')
createSql('streets')
