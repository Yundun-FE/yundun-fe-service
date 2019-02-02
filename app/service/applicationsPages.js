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
      const { block: _block, settings: _settings, translations: _translations } = formatDmConsole(item);
      blocks[name] = _block;
      settings[name] = _settings;
      translations[name] = _translations;

      exportBlocks.push(exportDmConsole(_block, _settings, _translations));
    }
  });

  return {
    blocks,
    settings,
    translations,
    exportBlocks,
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

    const { blocks, settings, translations, exportBlocks } = formatBlocks(data.blocks);
    data.blocks = blocks;
    data.settings = settings;
    data.translations = translations;

    return {
      blocks,
      settings,
      translations: {
        'zh-CN': {
          blocks: translations,
        },
      },
      exportBlocks,
    };


    const code = dataRoot.code;
    if (!dataRoot) throw new Error('Not found root');
    await this.saveByCodeEnv(code, env, data);
  }
  // 按 CODE 保存
  async saveByCodeEnv(code, env, data) {
    console.log(code, env);
    return { code, env };
    // const dataCheck = await this.Model.findOne({ where: { code, env } });
    // formatBlock
    // formatEdit
    //
  }
  // 按 CODE 读取所有环境
  async getByCode(code) {
    const data = await this.ctx.model.ApplicationsPages.findOne({ where: { code } });

    const blocks = {};
    data.blocks.forEach(item => {
      blocks[item.name] = item;
    });

    return {
      name: data.name,
      blocks,
    };
  }

  async getByCodeEnv(code, env) {
    //
  }

  async findByIdEnv(id, env = 'root') {
    const data = await this.Model.findOne({
      where: {
        id,
      },
    });
    if (env === 'root') return data;
    // 合并子环境
    // const dataEnv = await this.Model.findOne({
    //   where: {
    //     name: data.name,
    //     env,
    //   },
    // });

    data.env = env;
    // Object.assign(data.assets, dataEnv.assets);
    return data;
  }
}

module.exports = applicationsPagesService;
