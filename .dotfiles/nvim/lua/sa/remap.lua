vim.g.mapleader = "."
vim.keymap.set("n", "q", "<Nop>")

-- Awesome Custom Maps
vim.keymap.set('n', ')', '$')
vim.keymap.set("i", "jj", "<Esc>")
vim.keymap.set("n", "<Esc>", ":noh <CR>")
vim.keymap.set("x", "p", [[p:let @+=@0<CR>:let @"=@0<CR>]], { silent = true })
vim.keymap.set('v', '<leader>f', [[y<Esc>/<C-r>"<CR>]])
vim.keymap.set('n', '<leader>gt', [[<C-w><C-]><C-w>T]])
vim.keymap.set("v", "y", "\"+y")
vim.keymap.set("n", "y", "\"+y")

-- Basic
vim.keymap.set("n", "<leader>w", ":w<CR>")
vim.keymap.set("n", "<leader>ww", ":w!<CR>")
vim.keymap.set("n", "<leader>qq", ":q!<CR>")
vim.keymap.set("n", "<leader>qa", ":qa!<CR>")

-- Lines
vim.keymap.set("v", "J", ":m '>+1<CR>gv=gv")
vim.keymap.set("v", "K", ":m '<-2<CR>gv=gv")

-- Windows
vim.keymap.set('n', '<C-h>', '<C-w>h')
vim.keymap.set('n', '<C-k>', '<C-w>k')
vim.keymap.set('n', '<C-j>', '<C-w>j')
vim.keymap.set('n', '<C-l>', '<C-w>l')
vim.keymap.set('n', '<S-H>', '<C-w>H')
vim.keymap.set('n', '<S-K>', '<C-w>K')
vim.keymap.set('n', '<S-J>', '<C-w>J')
vim.keymap.set('n', '<S-L>', '<C-w>L')
vim.keymap.set("n", "<space>", "<C-w>w<CR>")
vim.keymap.set("n", "si", ":vsplit<Return><C-w>w<CR>")
vim.keymap.set("n", "sv", ":split<Return><C-w>w<CR>")

-- Terminal
vim.keymap.set("t", "<C-x>", vim.api.nvim_replace_termcodes("<C-\\><C-N>", true, true, true))
vim.keymap.set("t", "<A-i>", function() require("nvterm.terminal").toggle "float" end)
vim.keymap.set("t", "<A-h>", function() require("nvterm.terminal").toggle "horizontal" end)
vim.keymap.set("t", "<A-v>", function() require("nvterm.terminal").toggle "vertical" end)
vim.keymap.set("n", "<A-i>", function() require("nvterm.terminal").toggle "float" end)
vim.keymap.set("n", "<A-h>", function() require("nvterm.terminal").toggle "horizontal" end)
vim.keymap.set("n", "<A-v>", function() require("nvterm.terminal").toggle "vertical" end)

-- Telescope || Search
vim.keymap.set("n", "<leader>ff", "<cmd> Telescope find_files <CR>")
vim.keymap.set("n", "<leader>fa", "<cmd> Telescope find_files follow=true no_ignore=true hidden=true <CR>")
vim.keymap.set("n", "<leader>fw", "<cmd> Telescope live_grep <CR>")
vim.keymap.set("n", "<leader>fb", "<cmd> Telescope buffers <CR>")
vim.keymap.set("n", "<leader>fh", "<cmd> Telescope help_tags <CR>")
vim.keymap.set("n", "<leader>fo", "<cmd> Telescope oldfiles <CR>")
vim.keymap.set("n", "<leader>fz", "<cmd> Telescope current_buffer_fuzzy_find <CR>")

-- Telescope || Git + Fugitive
vim.keymap.set("n", "<leader>ci", "<cmd> Telescope git_commits <CR>")
vim.keymap.set("n", "<leader>st", "<cmd> Telescope git_status <CR>")
vim.keymap.set("n", "<leader>ma", "<cmd> Telescope marks <CR>")

-- NVimTree || File Explorer
vim.keymap.set("n", "<leader>n", "<cmd> NvimTreeToggle <CR>")

-- Comments
vim.keymap.set("n", "<C-_>", function() require("Comment.api").toggle.linewise.current() end)
vim.keymap.set("v", "<C-_>", "<ESC><cmd>lua require('Comment.api').toggle.linewise(vim.fn.visualmode())<CR>")

-- LSPSaga || Preview
local opts = { noremap = true, silent = true }
vim.keymap.set('n', 'gp', '<cmd>Lspsaga peek_definition<CR>', opts)
vim.keymap.set('n', 'gP', '<Cmd>Lspsaga goto_definition<CR>', opts)
vim.keymap.set('n', 'gl', '<Cmd>Lspsaga show_line_diagnostics<CR>', opts)
vim.keymap.set('n', 'gJ', '<cmd>Lspsaga diagnostic_jump_prev<CR>', opts)
vim.keymap.set('n', 'gk', '<cmd>Lspsaga hover_doc<CR>', opts)
vim.keymap.set('n', 'gr', '<cmd>Lspsaga rename<CR>', opts)

-- LSP
vim.keymap.set('n', 'gi', function() vim.lsp.buf.implementation { async = true } end)
vim.keymap.set("n", "<leader>fm", function() vim.lsp.buf.format { async = true } end)
