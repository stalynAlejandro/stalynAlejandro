vim.opt.nu = true
vim.opt.relativenumber = true

vim.opt.wrap = true
vim.opt.swapfile = false
vim.opt.scrolloff = 4
vim.opt.incsearch = true
vim.opt.cursorline = true
vim.opt.smartindent = true
vim.opt.signcolumn = 'number'
vim.opt.foldmethod = 'indent'

vim.g.mapleader = '.'
vim.keymap.set("n", "q", "<Nop>")

vim.keymap.set("n", ")", "$")
vim.keymap.set("i", "jj", "<Esc>")
vim.keymap.set("n", "<Esc>", ":noh <CR>")

vim.keymap.set('v', '<leader>f', [[y<Esc>/<C-r>"<CR>]])
-- vim.keymap.set('n', '<leader>gt', [[<C-w><C-]><C-w>T]])

-- Basic
vim.keymap.set("n", "<leader>w",":w<CR>")
vim.keymap.set("n", "<leader>ww", ":w!<CR>")
vim.keymap.set("n", "<leader>qq", ":q!<CR>")
vim.keymap.set("n", "<leader>qa", ":qa!<CR>")

-- Move Lines
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
