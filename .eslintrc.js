// module.exports = {
//   extends: ['taro/react'],
//   rules: {
//     'react/jsx-uses-react': 'off',
//     'react/react-in-jsx-scope': 'off',
//   },
// }
module.exports ={
  "extends": ["taro"],
  "rules": {
    "@typescript-eslint/no-unused-vars": ["error", { "varsIgnorePattern": "Taro" }],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".tsx"] }],
    "@typescript-eslint/no-unused-vars": "off"
  },
  "parser": "@typescript-eslint/parser",
  "plugins": ["typescript"]
}


