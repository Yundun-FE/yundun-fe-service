module.exports = app => {
  const { INTEGER, STRING, BOOLEAN } = app.Sequelize

  const Product = app.model.define('products', {
    title: {
      type: STRING(32),
      allowNull: false
    },
    show: {
      type: BOOLEAN,
      defaultValue: true
    },
    index: {
      type: INTEGER,
      defaultValue: 0
    }
  })

  return Product
}
