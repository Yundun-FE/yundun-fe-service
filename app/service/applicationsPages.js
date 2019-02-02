'use strict';

const Service = require('egg').Service;
const { formatDmConsole, exportDmConsole } = require('../utils/blocks/DmConsole');

function formatBlocks(data) {
  const blocks = {};
  const settings = {};
  const translations = {};

  const exportBlocks = [];
  data.forEach(item => {
    const { name, blockName } = item;
    if (blockName === 'DmConsole') {
      const { blocks: _blocks, settings: _settings, translations: _translations } = formatDmConsole(item);
      blocks[name] = _blocks;
      settings[name] = _settings;
      translations[name] = _translations;
    }
  });

  return {
    blocks,
    settings,
    translations,
  };
}

class applicationsPagesService extends Service {
  constructor(ctx) {
    super(ctx);
    this.Model = ctx.model.ApplicationsPages;
  }
  // 保存配置
  async saveByIdEnv(id, env, data) {
    const dataRoot = await this.Model.findOne({ where: { id, env: 'root' } });
    if (!dataRoot) throw new Error('没有找到 root');

    const code = data.code;
    const { blocks, settings, translations } = formatBlocks(data.content);
    data.blocks = blocks;
    data.settings = settings;
    data.translations = {
      'zh-CN': {
        blocks: translations,
      },
    };

    return await this.saveByCodeEnv(code, env, data);
  }
  // 按 CODE 保存
  async saveByCodeEnv(code, env, data) {
    const dataRoot = await this.Model.findOne({ where: { code, env: 'root' } });
    if (!dataRoot) throw new Error('没有找到该 Root');

    const { blocks: rootBlocks, settings: rootSettings, translations: rootTranslations } = formatBlocks(dataRoot.content);
    const dataCheck = await this.Model.findOne({ where: { code, env } });
    const { blocks, settings, translations } = formatBlocks(data.content);
    let result;

    if (!dataCheck) {
      const create = {
        code,
        env,
        remarks: data.remarks,
        settings,
        blocks: {},
        translations: {},
        content: data.content,
      };
      result = await this.Model.create(create);
    } else {
      const update = {
        remarks: data.remarks,
        content: data.content,
        settings: data.settings,
      };
      result = await this.Model.update(update, {
        where: { code, env },
      });
    }

    return result;
  }
  // 按 CODE 读取所有环境
  async getByCode(code) {
    const data = await this.ctx.model.ApplicationsPages.findOne({ where: { code } });

    // const { blocks, settings, translations } = data;
    // const blocksTranslations = translations['zh-CN'].blocks;
    // data.blocks = data.blocks.DmConsole(blocks, settings, blocksTranslations);

    return {
      name: data.name,
      content: data.content,
    };
  }

  async getByCodeEnv(code, env) {
    //
  }

  async findByIdEnv(id, env = 'root') {
    const dataRoot = await this.Model.findOne({
      where: {
        id,
      },
    });

    let data = {};
    data = {
      id: dataRoot.id,
      name: dataRoot.name,
      code: dataRoot.code,
      remakrs: dataRoot.remkars,
      path: dataRoot.path,
      env,
      content: dataRoot.content,
    };

    if (env === 'root') return data;
    // 环境合并
    const dataEnv = await this.Model.findOne({
      where: {
        code: data.code,
        env,
      },
    });

    data.env = env;
    if (dataEnv) {
      data.content = dataEnv.content;
    }

    return data;
  }
}

module.exports = applicationsPagesService;
