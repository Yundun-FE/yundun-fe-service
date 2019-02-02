const { merge } = require('lodash/object');

function formatColumns(data) {
  const columnsData = {};
  const columnsSettings = {};
  const columnsTranslations = {};

  data.forEach(item => {
    const name = item.name || item.props.prop;
    if (!name) throw new Error('请填写 columns props.name 或 name');

    columnsData[name] = {
      componentName: item.componentName,
      props: {
        prop: item.props.prop,
      },
    };
    columnsSettings[name] = {
      props: {
        minWidth: item.props.minWidth,
        width: item.props.width,
      },
    };
    columnsTranslations[name] = {
      props: {
        label: item.props.label,
      },
    };
  });

  columnsSettings.$order = data.map(item => item.name || item.props.prop);

  return {
    columnsData,
    columnsSettings,
    columnsTranslations,
  };
}

function formatActions(data) {
  const actionsData = {};
  const actionsSettings = {};
  const actionsTranslations = {};

  data.forEach(item => {
    const name = item.name || item.command;
    if (!name) throw new Error('请填写 actions name 或 command');

    actionsData[name] = {
      command: item.command,
    };
    actionsSettings[name] = {
      type: item.type,
    };
    actionsTranslations[name] = {
      label: item.label,
    };

    if (item.items) {
      const { actionsData: _actionsData, actionsSettings: _actionsSettings, actionsTranslations: _actionsTranslations } = formatActions(item.items);
      actionsData[name].items = _actionsData;
      actionsSettings[name].items = _actionsSettings;
      actionsTranslations[name].items = _actionsTranslations;
    }
  });

  actionsSettings.$order = data.map(item => item.name || item.command);

  return {
    actionsData,
    actionsSettings,
    actionsTranslations,
  };
}

function formatDmConsole(data) {
  const { title, props } = data;
  const { columnsData, columnsSettings, columnsTranslations } = formatColumns(props.columns);
  const { actionsData: actionsRowData, actionsSettings: actionsRowSettings, actionsTranslations: actionsRowTranslations } = formatActions(props.actionsRow);
  const { actionsData: actionsToolbarData, actionsSettings: actionsToolbarSettings, actionsTranslations: actionsToolbarTranslations } = formatActions(props.actionsToolbar);

  const block = {
    props: {
      columns: columnsData,
      actionsRow: actionsRowData,
      actionsToolbar: actionsToolbarData,
    },
  };
  const settings = {
    props: {
      columns: columnsSettings,
      actionsRow: actionsRowSettings,
      actionsToolbar: actionsToolbarSettings,
    },
  };
  const translations = {
    title,
    props: {
      columns: columnsTranslations,
      actionsRow: actionsRowTranslations,
      actionsToolbar: actionsToolbarTranslations,
    },
  };

  return {
    block,
    settings,
    translations,
  };
}

function sortByOrder(data, order) {
  const list = [];
  order.forEach(key => {
    list.push(data[key]);
  });
  return list;
}

function exportFormat(data) {
  Object.keys(data).forEach(key => {
    const _data = data[key];

    if (typeof _data === 'object') {
      if (_data.$order) {
        data[key] = sortByOrder(_data, _data.$order);
      }
      return exportFormat(_data);
    }
  });
  return data;
}

function exportDmConsole(block, settings, translations) {
  const data = merge(block, settings, translations);
  return exportFormat(data);
}

exports.formatDmConsole = formatDmConsole;
exports.exportDmConsole = exportDmConsole;
