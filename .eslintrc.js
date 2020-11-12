module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: [
        "plugin:react/recommended",
        "airbnb",
        "plugin:@typescript-eslint/recommended",
        "plugin:import/typescript"
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: "module"
    },
    plugins: ["react", "@typescript-eslint"],
    rules: {
        indent: ["error", 4],
        semi: ["error", "never"],
        quotes: ["error", "double"],
        "object-curly-newline": 0,
        "brace-style": 0,
        "arrow-parens": ["error", "as-needed"],
        "comma-dangle": ["error", "never"],
        "react/prop-types": 0,
        "object-shorthand": 0,
        "no-lonely-if": 0,
        "react/no-unescaped-entities": 0,
        "no-use-before-define": "off",
        "@typescript-eslint/no-use-before-define": ["error"],
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                js: "never",
                jsx: "never",
                ts: "never",
                tsx: "never"
            }
        ],
        "no-param-reassign": ["error", { props: false }],
        "max-len": 0,
        "react/jsx-indent": 0,
        "@typescript-eslint/explicit-function-return-type": "off",
        "react/jsx-filename-extension": [
            2,
            {
                extensions: [".js", ".jsx", ".ts", ".tsx"]
            }
        ],
        "react/jsx-one-expression-per-line": 0,
        "import/no-extraneous-dependencies": 0,
        "import/no-unresolved": 0
    }
}
