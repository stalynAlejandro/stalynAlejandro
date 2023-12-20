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
--
--
-- local options = {
--     on_attach = my_on_attach,
--     filters = {
--         dotfiles = false,
--         exclude = { vim.fn.stdpath "config" .. "/lua/custom" },
--     },
--     disable_netrw = true,
--     hijack_netrw = true,
--     hijack_cursor = true,
--     hijack_unnamed_buffer_when_opening = false,
--     sync_root_with_cwd = true,
--     update_focused_file = {
--         enable = true,
--         update_root = false,
--     },
--     view = {
--         adaptive_size = false,
--         side = "left",
--         width = 30,
--         preserve_window_proportions = true,
--     },
--     git = {
--         enable = false,
--         ignore = true,
--     },
--     filesystem_watchers = {
--         enable = true,
--     },
--     actions = {
--         open_file = {
--             resize_window = true,
--         },
--     },
--     -- renderer = {
--     --     root_folder_label = false,
--     --     highlight_git = false,
--     --     highlight_opened_files = "none",
--     --
--     --     indent_markers = {
--     --         enable = false,
--     --     },
--     --
--     --     icons = {
--     --         show = {
--     --             file = true,
--     --             folder = true,
--     --             folder_arrow = true,
--     --             git = false,
--     --         },
--     --         glyphs = {
--     --             default = "📄",
--     --             symlink = "🔗",
--     --             folder = {
--     --                 default = "🗂️",
--     --                 empty = "📁",
--     --                 empty_open = "📂",
--     --                 open = "📂",
--     --                 symlink = "🔗",
--     --                 symlink_open = "🔗📂",
--     --                 arrow_open = "↪️ ",
--     --                 arrow_closed = "➡️ ",
--     --             },
--     --             git = {
--     --                 unstaged = "🟡",
--     --                 staged = "🟢",
--     --                 unmerged = "🚩",
--     --                 renamed = "🇷",
--     --                 untracked = "🔶",
--     --                 deleted = "❌",
--     --                 ignored = "🔸",
--     --             },
--     --         },
--     --     },
--     -- },
-- }
--
-- vim.g.loaded_netrw = 1
-- vim.g.loaded_netrwPlugin = 1
-- vim.opt.termguicolors = true
-- require("nvim-tree").setup(options)


-- disable netrw at the very start of your init.lua
vim.g.loaded_netrw = 1
vim.g.loaded_netrwPlugin = 1

-- set termguicolors to enable highlight groups
vim.opt.termguicolors = true

-- empty setup using defaults
-- require("nvim-tree").setup()

-- OR setup with some options
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
                    -- symlink = "🔗",
                    -- symlink_open = "🔗📂",
                    -- arrow_open = "↪️ ",
                    -- arrow_closed = "➡️ ",
                },
                -- git = {
                --     unstaged = "🟡",
                --     staged = "🟢",
                --     unmerged = "🚩",
                --     renamed = "🇷",
                --     untracked = "🔶",
                --     deleted = "❌",
                --     ignored = "🔸",
                -- },
            },
        },

    },
    git = {
        enable = true,
        ignore = false,
    },
    filters = {
        dotfiles = true,
        exclude = { vim.fn.stdpath "config" .. "/lua/custom" },
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
