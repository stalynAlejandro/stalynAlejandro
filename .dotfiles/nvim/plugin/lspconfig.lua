local lspconfig = require('lspconfig')
lspconfig.pyright.setup {}

lspconfig.tsserver.setup {
    -- on_attach = on_attach,
    filetypes = { "javascript", "javascriptreact", "typescript", "typescriptreact", "typescript.tsx" },
    cmd = { "typescript-language-server", "--stdio" },
    -- capabilities = capabilities
}

lspconfig.rust_analyzer.setup {
    settings = {
        ['rust-analyzer'] = {},
    },
}

lspconfig.lua_ls.setup {
    -- capabilities = capabilities,
    on_attach = function(client, bufnr)
        -- on_attach(client, bufnr)
        -- enable_format_on_save(client, bufnr)
    end,
    settings = {
        Lua = {
            diagnostics = {
                globals = { 'vim' },
            },
            workspace = {
                library = vim.api.nvim_get_runtime_file("", true),
                checkThirdParty = false
            },
        },
    },
}

local signs = { Error = '', Warn = ' ', Hint = '', Info = " " }
for type, icon in pairs(signs) do
    local hl = "DiagnosticSign" .. type
    vim.fn.sign_define(hl, { text = icon, texthl = hl, numhl = "" })
end

-- Global mappings.
-- See `:help vim.diagnostic.*` for documentation on any of the below functions
vim.keymap.set('n', '<space>e', vim.diagnostic.open_float)
vim.keymap.set('n', '[d', vim.diagnostic.goto_prev)
vim.keymap.set('n', ']d', vim.diagnostic.goto_next)
vim.keymap.set('n', '<space>q', vim.diagnostic.setloclist)

-- Use LspAttach autocommand to only map the following keys
-- after the language server attaches to the current buffer
vim.api.nvim_create_autocmd('LspAttach', {
    group = vim.api.nvim_create_augroup('UserLspConfig', {}),
    callback = function(ev)
        -- Enable completion triggered by <c-x><c-o>
        vim.bo[ev.buf].omnifunc = 'v:lua.vim.lsp.omnifunc'

        -- Buffer local mappings.
        -- See `:help vim.lsp.*` for documentation on any of the below functions
        local opts = { buffer = ev.buf }
        vim.keymap.set('n', 'gD', vim.lsp.buf.declaration, opts)
        vim.keymap.set('n', 'gd', vim.lsp.buf.definition, opts)
        vim.keymap.set('n', '<space>rn', vim.lsp.buf.rename, opts)
        vim.keymap.set({ 'n', 'v' }, '<space>ca', vim.lsp.buf.code_action, opts)
        -- vim.keymap.set('n', 'gi', vim.lsp.buf.implementation, opts)
        -- vim.keymap.set('n', '<space>K', vim.lsp.buf.hover, opts)
       -- vim.keymap.set('n', '<space>k', vim.lsp.buf.signature_help, opts)
        -- vim.keymap.set('n', '<space>d', vim.lsp.buf.type_definition, opts)
        -- vim.keymap.set('n', '<space>f', function()
        --     vim.lsp.buf.format { async = true }
        -- end, opts)
        -- vim.keymap.set('n', '<space>wa', vim.lsp.buf.add_workspace_folder, opts)
        -- vim.keymap.set('n', '<space>wr', vim.lsp.buf.remove_workspace_folder, opts)
        -- vim.keymap.set('n', '<space>wl', function()
        --     print(vim.inspect(vim.lsp.buf.list_workspace_folders()))
        -- end, opts)
        --vim.keymap.set('n', 'gr', vim.lsp.buf.references, opts)
    end,
})
