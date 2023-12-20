vim.g.loaded_netrw = 1
vim.g.loaded_netrwPlugin = 1
vim.opt.termguicolors = true

local function my_on_attach(bufnr)
    local api = require "nvim-tree.api"

    local function opts(desc)
        return { desc = "nvim-tree: " .. desc, buffer = bufnr, noremap = true, silent = true, nowait = true }
    end

    api.config.mappings.default_on_attach(bufnr)
    vim.keymap.set('n', '?', api.tree.toggle_help, opts('Help'))
    vim.keymap.set('n', '<C-r>', api.tree.change_root_to_parent, opts('Up'))
    vim.keymap.set('n', '<C-t>', api.tree.change_root_to_node, opts('CD'))
    vim.keymap.set('n', '<C-S-_>', api.tree.collapse_all, opts('Up'))
    vim.keymap.set('n', '<leader>q', api.tree.close, opts('Close'))
end

require("nvim-tree").setup({
    on_attach = my_on_attach,
    sort = {
        sorter = "case_sensitive",
    },
    renderer = {
        group_empty = true,
        icons = {
            show = {
                file = true,
                folder = true,
                folder_arrow = true,
                git = true,
            },
            glyphs = {
                default = "📄",
                symlink = "🔗",
                folder = {
                    default = "🗂️",
                    empty = "📁",
                    empty_open = "📂",
                    open = "📂",
                },
            },
        },

    },
    git = {
        enable = true,
        ignore = false,
    },
    filters = {
        dotfiles = false,
    },
    disable_netrw = true,
    hijack_netrw = true,
    hijack_cursor = true,
    hijack_unnamed_buffer_when_opening = false,
    sync_root_with_cwd = true,
    update_focused_file = {
        enable = true,
        update_root = false,
    },
    view = {
        adaptive_size = false,
        side = "left",
        width = 30,
        preserve_window_proportions = true,
    },
    filesystem_watchers = {
        enable = true,
    },
    actions = {
        open_file = {
            resize_window = true,
        },
    },
})
