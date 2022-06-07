import path from 'path'
import pxtoviewport from 'postcss-px-to-viewport'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'

function resolve (dir) {
  return path.resolve(__dirname,'..', dir)
}
const config = {
  projectName: "muzat-react",
  date: "2022-5-29",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
  },
  sourceRoot: "src",
  outputRoot: "dist",
  plugins: [
    '@tarojs/plugin-html'
    // ['@tarojs/plugin-html', {
    //   // 过滤 antd 组件库的前缀：am-
    //   pxtransformBlackList: [/am-/, /demo-/, /^body/]
    // }]
  ],
  defineConstants: {},
  copy: {
    patterns: [],
    options: {},
  },
  alias: {
    '@': resolve('/src'),
    "@assets": resolve("/src/assets"),
    "@api": resolve("/src/api"),
    "@components": resolve("/src/components"),
    "@defineds":resolve('/src/defineds'),
    "@hooks": resolve("/src/hooks"),
    "@icons": resolve("/src/icons"),
    "@lang": resolve("/src/lang"),
    "@layout": resolve("/src/layout"),
    "@lib": resolve("/src/lib"),
    "@store": resolve("/src/store"),
    "@styles": resolve("/src/styles"),
    "@utils": resolve("/src/utils"),
    "@pages": resolve("/src/pages"),
  },
  framework: "react",
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
  h5: {
    publicPath: "/",
    staticDirectory: "static",
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3,
                },
              ],
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
            plugins: [
              [
                'babel-plugin-react-scoped-css',
                {
                  include: '.scoped.s?css$',
                },
              ],
              [
                '@babel/plugin-proposal-decorators',
                {
                  legacy: true,
                },
              ],
              [
                '@babel/plugin-proposal-class-properties',
                {
                  loose: true,
                },
              ],
              [
                '@babel/plugin-proposal-private-methods',
                {
                  loose: true,
                },
              ],
              '@loadable/babel-plugin',
              // ["@babel/plugin-proposal-private-property-in-object", { "loose": true }],
            ],
          },
        }],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'scoped-css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer,
                  pxtoviewport({
                    viewportWidth: 375,
                  }),
                ].concat(process.env.NODE_ENV === 'development' ? [] : [
                  cssnano,
                ]),
              },
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'scoped-css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer,
                  pxtoviewport({
                    viewportWidth: 375,
                  }),
                ].concat(process.env.NODE_ENV === 'development' ? [] : [
                  cssnano,
                ]),
              },
            },
          },
        ],
      },
    ],
  },

};

module.exports = function (merge) {
  if (process.env.NODE_ENV === "development") {
    return merge({}, config, require("./dev"));
  }
  return merge({}, config, require("./prod"));
};
