const CssExtract = require("mini-css-extract-plugin");
const {isDev} = require('./utils')

const getStyleRules = ({pattern, loader}) => {

    const rule = {
        test: pattern,
        use: [
                {
                    loader: CssExtract.loader,
                    options: {
                        reloadAll: true,
                        hmr: isDev, // hot reload style output file
                    }
                },
                'css-loader', // дефолтный для всех препроцов
                loader, // для каждого препроца свой
            // или если не нужно сжимать ['style-loader','css-loader']
            //style-loader - добавляет все стили в head
            // css-loader - парсит css импорты
        ]
    }

    if(loader){
        rule.use.push(loader)
    }

    return rule
}

const getBabelConfig = (preset) => {
    const rules = {
        presets: ['@babel/preset-env'],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    }

    if(preset){
        if(Array.isArray(preset)){
            rules.presets.push(...preset)
        }
        else{
            rules.presets.push(preset)
        }
    }

    return rules
}

const getJsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: getBabelConfig()
    }]

    if (isDev) {
        loaders.push('eslint-loader')
    }

    return loaders
}

module.exports = {getStyleRules, getBabelConfig, getJsLoaders}