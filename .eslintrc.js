module.exports ={
  "extends": ["taro"],
  "rules": {
    "@typescript-eslint/no-unused-vars": ["error", { "varsIgnorePattern": "Taro" }],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".tsx"] }]
  },
  "parser": "@typescript-eslint/parser",
  "plugins": ["typescript"]
}

