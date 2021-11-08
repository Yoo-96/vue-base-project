
# vue3-base-project

# 简介

从零搭建 `vue3.x` 项目工程环境，集成 `ESLint`、`Prettier`、`Stylelint`、`husky`、`lint-staged` 等

[仓库地址 - github](https://github.com/Yoo-96/vue3-base-project)，欢迎使用和点亮小星星。

[从零搭建Vue3.x项目工程环境 - 掘金文章地址](https://juejin.cn/post/7027019320869781512/)

## 所用技术栈

- 构建工具： [Vite](https://vitejs.dev/)
- 前端框架： [Vue3.x](https://v3.cn.vuejs.org/)
- 编程语言： [TypeScript](https://www.typescriptlang.org/)
- 代码规范：
    - [ESLint](https://eslint.org/)
    - [Prettier](https://prettier.io/)
    - [Stylelint](https://stylelint.io/)
- 提交规范：
    - [husky](https://typicode.github.io/husky/#/)
    - [lint-staged](https://www.npmjs.com/package/lint-staged)
- css预处理器： [less](https://lesscss.org/)
- 路由工具： [Vue Router 4](https://next.router.vuejs.org/zh/introduction.html)
- 状态管理： [Vuex 4](https://next.vuex.vuejs.org/zh/)

# `vite` 初始化项目

```bash
npm init vite@latest <project-name> vue-ts
```

# `alias` 别名配置

## 修改 `vite.config.js`

```js
// vite.config.js

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // __dirname找不到，需要安装 npm install @types/node --save-dev
      '@': resolve(__dirname, 'src'),
    },
  },
});
```

## 修改 `tsconfig.json`

```js
"compilerOptions": {
    ...
    "paths": {
      "@/*": [ "./src/*" ],
    }
},
```

# 配置 `eslint` 、`prettier`

## 安装所需依赖

```bash
yarn add eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-vue prettier eslint-config-prettier eslint-plugin-prettier -D
```

## 添加 `.eslintrc.js` 及其配置

```js
module.exports = {
  parser: 'vue-eslint-parser',
  extends: ['plugin:vue/recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  rules: {
    'generator-star-spacing': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: [2, 'always'],
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    'no-undef': 'off',
    'eol-last': [1, 'always'],
    'no-mixed-spaces-and-tabs': 2,
    'prettier/prettier': [
      'error',
      { singleQuote: true, vueIndentScriptAndStyle: false, semi: true },
    ],
    'vue/no-multiple-template-root': 0, // template 唯一跟节点校验
    'vue/multi-word-component-names': 0,
  },
};
```

## 添加 `prettier.config.js` 及其配置

```js
module.exports = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: 'all', // 未尾逗号
  vueIndentScriptAndStyle: false,
  singleQuote: true, // 单引号
  quoteProps: 'as-needed',
  bracketSpacing: true,
  trailingComma: 'all', // 未尾分号
  jsxBracketSameLine: false,
  jsxSingleQuote: false,
  arrowParens: 'always',
  insertPragma: false,
  requirePragma: false,
  proseWrap: 'never',
  htmlWhitespaceSensitivity: 'strict',
  endOfLine: 'lf',
};
```

## 添加 `.editorconfig` 及其配置

`EditorConfig` 有助于为不同 `IDE` 编辑器上处理同一项目的多个开发人员维护一致的编码风格

```
# Editor configuration, see http://editorconfig.org

# 表示是最顶层的 EditorConfig 配置文件
root = true

# 匹配全部文件
[*]
# 缩进风格，可选"space"、"tab"
indent_style = space
# 缩进的空格树 2
indent_size = 2
# 结尾换行符，可选"if"、"or"、"orif"
end_of_line = lf
# 设置字符集
charset = utf-8
# 删除一行中的前后空格
trim_trailing_whitespace = true
# 在文件结尾插入新行
insert_final_newline = true
```

# 配置 `stylelint`

`stylelint` 是一个 `css` 检测器，可以让开发者编写样式是遵循一致的约定，避免代码混乱和不必要的错误。

[stylelint rules](http://stylelint.cn/user-guide/rules/)

## 安装所需依赖

```bash
yarn add stylelint stylelint-config-recommended-vue stylelint-config-standard postcss-html postcss-less -D
```

## 添加 `.stylelintrc` 及相关依赖

```json
{
  "extends": ["stylelint-config-standard", "stylelint-config-recommended-vue"],
  "rules": {
    "no-empty-source": null,
    "property-no-vendor-prefix": null,
    "number-leading-zero": "always",
    "number-no-trailing-zeros": true,
    "length-zero-no-unit": true,
    "value-list-comma-space-after": "always",
    "declaration-colon-space-after": "always",
    "value-list-max-empty-lines": 0,
    "shorthand-property-no-redundant-values": true,
    "declaration-block-no-duplicate-properties": true,
    "declaration-block-no-redundant-longhand-properties": true,
    "declaration-block-semicolon-newline-after": "always",
    "block-closing-brace-newline-after": "always",
    "media-feature-colon-space-after": "always",
    "media-feature-range-operator-space-after": "always",
    "at-rule-name-space-after": "always",
    "indentation": 2,
    "no-eol-whitespace": true,
    "string-no-newline": null,
    "string-quotes": "double",
    "at-rule-no-unknown": [ true, {
      "ignoreAtRules": [
        "/-/"
      ]
    }]
  }
}
```

## 配置 package.json 脚本

```js
{
    "scripts": {
        ...,
        "lint:style": "stylelint \"src/**/*.(vue|less|css)\" --customSyntax postcss-less"
    }
}
```

# 配置代码检查和提交规范钩子

## 配置 husky

[husky 官方文档](https://typicode.github.io/husky/#/)

### 安装 `husky`

```bash
yarn add husky --dev
```

### 启用 `git hooks`

```bash
yarn husky install
```

### 增加 `pre-commit`

```bash
npx husky add .husky/pre-commit "npm run lint"
```

此时会在 `.husky/` 目录下创建 `pre-commit` 文件

### 配置 `package.json` 脚本

```js
{
    "scripts": {
        ...,
        "lint": "eslint . --ext .js,.ts,.vue --ignore-path .gitignore",
        "prepare": "husky install"
    }
}
```

### 添加 `commit` 提交内容规范 `git hooks`

```bash
npx husky add .husky/commit-msg 'yarn commitlint --edit "$1"'
```

此时会在 `.husky/` 目录下创建 `commit-msg` 文件

### 添加 `commitlint.config.js` 及相关依赖

[Git 提交的正确姿势：Commit message 编写指南](https://www.oschina.net/news/69705/git-commit-message-and-changelog-guide)

```bash
yarn add @commitlint/cli @commitlint/config-conventional -D
```

```js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore']],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never'],
  },
};
```

## 配置 lint-staged

[lint-staged 官方文档](https://www.npmjs.com/package/lint-staged)

`lint-staged` 只会对提交的文件进行检查、修复处理，以保证代码是符合本项目 `eslint` 等规范的。

### 安装

```bash
yarn add lint-staged -D
```

### 添加 `.lintstagedrc` 配置文件及依赖

```
{
  "*.{js,ts,vue}": ["npm run lint"],
  "*.{html,vue,css,scss,sass,less}": ["npm run lint:style"]
}
```

### 修改 `pre-commit` 文件

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

- npm run lint
+ yarn lint-staged --allow-empty "$1"
```

## 验证代码检查和提交规范钩子功能

### 代码检查

```bash
# 执行
git add .
git commit -m "test..."

# 输出
yarn run v1.13.0
warning package.json: No license field
$ /vue-base-project/node_modules/.bin/lint-staged --allow-empty ''
✔ Preparing...
⚠ Running tasks...
  ❯ Running tasks for *.{js,ts,vue}
    ✖ npm run lint [FAILED]
  ❯ Running tasks for *.{html,vue,css,scss,sass,less}
    ✖ stylelint --fix [FAILED]
↓ Skipped because of errors from tasks. [SKIPPED]
✔ Reverting to original state because of errors...
✔ Cleaning up...

✖ stylelint --fix:
Error: No configuration provided for /vue-base-project/src/components/UserPane/UserInfo.vue
    at module.exports (/vue-base-project/node_modules/stylelint/lib/utils/configurationError.js:10:14)
    at getConfigForFile (/vue-base-project/node_modules/stylelint/lib/getConfigForFile.js:60:4)
    at async isPathIgnored (/vue-base-project/node_modules/stylelint/lib/isPathIgnored.js:25:17)
    at async lintSource (/vue-base-project/node_modules/stylelint/lib/lintSource.js:37:20)
    at async /vue-base-project/node_modules/stylelint/lib/standalone.js:218:27
    at async Promise.all (index 0)
    at async standalone (/vue-base-project/node_modules/stylelint/lib/standalone.js:257:22)

✖ npm run lint:
jsxBracketSameLine is deprecated.
npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! vue-base-project@0.0.1 lint: `eslint . --ext .js,.ts,.vue --ignore-path .gitignore "/vue-base-project/commitlint.config.js" "/vue-base-project/src/components/UserPane/UserInfo.vue"`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the vue-base-project@0.0.1 lint script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     /.npm/_logs/2021-11-04T07_56_03_833Z-debug.log

> vue-base-project@0.0.1 lint /vue-base-project
> eslint . --ext .js,.ts,.vue --ignore-path .gitignore "/vue-base-project/commitlint.config.js" "/vue-base-project/src/components/UserPane/UserInfo.vue"


/vue-base-project/src/components/UserPane/UserInfo.vue
  9:51  error  Insert `;`         prettier/prettier
  9:51  error  Missing semicolon  semi

✖ 2 problems (2 errors, 0 warnings)
  2 errors and 0 warnings potentially fixable with the `--fix` option.

error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
husky - pre-commit hook exited with code 1 (error)
```

从错误信息可以看出，检测到本次提交的代码中，`src/components/UserPane/UserInfo.vue` 文件存在不符合 `eslint` 规范的内容

### 提交规范

```bash
# 执行
git add .
git commit -m "test..."

# 输出
yarn run v1.13.0
warning package.json: No license field
$ /vue-base-project/node_modules/.bin/lint-staged --allow-empty ''
✔ Preparing...
✔ Running tasks...
✔ Applying modifications...
✔ Cleaning up...
✨  Done in 2.50s.
yarn run v1.13.0
warning package.json: No license field
$ /vue-base-project/node_modules/.bin/commitlint --edit .git/COMMIT_EDITMSG
⧗   input: test...
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]

✖   found 2 problems, 0 warnings
ⓘ   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint

error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
husky - commit-msg hook exited with code 1 (error)
```

从错误信息可以看出，git代码提交的描述：`"test..."`，不符合规范

# 配置 `less` 预处理器

## 安装所需依赖

```bash
yarn add less less-loader -D
```

## `less` 全局变量

### 添加 `custom.less` 文件

```less
@primary-color : #3e94e1;
```

### 修改 `vite.config.ts` 配置

```js
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        additionalData: `@import "${resolve(__dirname, 'src/assets/css/custom.less')}";`,
      },
    },
  },
});
```

## 引入 normalize.css

[normalize.css](https://github.com/necolas/normalize.css)

# 配置 `vue-router`

## 安装

```bash
yarn add vue-router@4
```

## 添加 `router` 目录及其配置

### 创建 `router/index.ts` 文件

```js
// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Home/index.vue'),
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('@/views/User/index.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```

### 注册 `router` 实例

```js
import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router/index';

const app = createApp(App);
app.use(router);
app.mount('#app');
```

## 使用示例

```js
<template>
  <button @click="toPage('home')">to home page</button>

  <button @click="toPage('user')">to user page</button>
  <br />
  <br />
  <br />
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const router = useRouter();
    const toPage = (name: string) => {
      router.push({
        name,
      });
    };
    return {
      toPage,
    };
  },
});
</script>

<style></style>
```

# 配置 `vuex`

## 安装

```bash
yarn add vuex@next --save
```

## 添加 `store` 目录及其配置

### 目录结构

```
├── store
│   ├── getters.ts
│   ├── index.ts
│   └── modules
│       └── user.ts
```

### 创建 `userStore Module` 实例

```js
import { UserInfoType } from '@/types/user';

import { fetchUsetInfo } from '@/api/user';

const userStore = {
  namespaced: true,
  state() {
    return {
      info: {
        name: '',
        desc: '',
      },
    };
  },
  mutations: {
    SET_USER_INFO(state: any, info: UserInfoType) {
      state.info = info;
    },
  },
  actions: {
    getUserInfo({ commit }: any, name: string) {
      return new Promise((resolve, reject) => {
        fetchUsetInfo(name)
          .then((response) => {
            commit('SET_USER_INFO', response);
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};

export default userStore;
```

### 创建 `store`

```js
import { createStore } from 'vuex';
import user from './modules/user';
import getters from './getters';

const store = createStore({
  modules: {
    user,
  },
  getters,
});

export default store;
```

### 注册 `store` 实例

```js
import { createApp } from 'vue';
import App from './App.vue';
import store from '@/store/index';

const app = createApp(App);
app.use(store);
app.mount('#app');
```

## 使用示例

```js
<template>
  <div class="user-info">
    <div>name: {{ userInfo.name }}</div>
    <div>desc: {{ userInfo.desc }}</div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  props: {
    count: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    const store = useStore();

    const getUserInfo = async (name: string) => {
      store.dispatch('user/getUserInfo', name);
    };

    onMounted(() => {
      getUserInfo('yoo');
    });

    return {
      userInfo: computed(() => store.getters.userInfo),
    };
  },
});
</script>
```

# FAQ

## vscode提示：The template root requires exactly one element

**原因：**

`vue3` 版本中 `template` 下支持多个节点，而这在 `vue2` 版本是不允许的

**解决方法：**

1. Vetur插件修改配置，设置=>首选项=>搜索“eslint”=>取消勾选Vetur下的`Vetur template validation`
2. eslint rules 增加

```js
rules: {
    ...
    'vue/no-multiple-template-root': 0, // template 唯一跟节点校验
},
```

## VSCode中ESLint、Prettier 配置冲突问题

想要修改prettier的默认配置，在.eslintrc.js中覆盖prettier插件的设置。需要配置rules

```js
rules: {
    ...
    'prettier/prettier': ['error', { singleQuote: true, parser: 'flow', semi: true }],
},
```

[VSCode中ESLint、Prettier 配置冲突问题原因及解决方案](https://zhuanlan.zhihu.com/p/347339865)

## Vite alias 引入ts文件报错

`tsconfig.json` 中增加配置：

```js
"compilerOptions": {
    ...
    "paths": {
      "@/*": [ "./src/*" ],
    }
},
```

## `stylelint` 检测 `.vue` 文件提示 `Unknown word CssSyntaxError`

**原因：**

`styleliint` 不能直接解析 `vue` 文件中的 `stylus` ，需要增加额外插件支持

[postcss-html#linting-with-stylelint](https://github.com/ota-meshi/postcss-html#linting-with-stylelint)

**解决方法：**

安装插件：

```bash
yarn add stylelint-config-recommended-vue postcss-html postcss-less -D
```

修改 `.stylelintrc` 配置：

```js
{
    - "extends": ["stylelint-config-standard"],

    + "extends": ["stylelint-config-standard", "stylelint-config-recommended-vue"],
}
```

修改 `package.json` 中 `lint:style` 脚本：

```js
"scripts": {
    "lint:style": "stylelint \"src/**/*.(vue|less|css)\" --customSyntax postcss-less"
}
```

# 总结

本文主要讲解了如何一步步搭建 `vue3.x` 项目工程环境，以及如何对代码规范、提交进行约束，基本涵盖了一个项目前期搭建的整个流程。

篇幅有点长，有错误的地方欢迎大家指正哈，谢谢大家的支持！

❤️ ❤️ ❤️ ❤ ❤️

