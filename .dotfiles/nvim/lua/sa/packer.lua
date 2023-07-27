vim.cmd [[packadd packer.nvim]]

return require('packer').startup(function(use)
    use 'wbthomason/packer.nvim'

    -- Github
    use "tpope/vim-fugitive"

    -- Terminal
    use {
        "NvChad/nvterm",
        config = function()
            require("nvterm").setup()
        end,
    }

    -- Comments
    use {
        'numToStr/Comment.nvim',
        config = function()
            require('Comment').setup()
        end
    }

    -- Telescope || Search
    use {
        'nvim-telescope/telescope.nvim', tag = '0.1.2',
        requires = { { 'nvim-lua/plenary.nvim' } }
    }

    -- NVTree || File Explorer
    use {
        'nvim-tree/nvim-tree.lua',
        'nvim-tree/nvim-web-devicons', -- optional
        requires = {
        },
    }

    -- Harpoon
    use 'theprimeagen/harpoon'

    -- Treesitter || Code Sintax
    use('nvim-treesitter/nvim-treesitter', { run = ':TSUpdate' })

    -- Lualine || Colors
    use 'nvim-lualine/lualine.nvim'

    -- LSPSaga || Preview
    use "glepnir/lspsaga.nvim"

    -- -- LSP Config
    use "neovim/nvim-lspconfig"           -- LSP
    use "jose-elias-alvarez/null-ls.nvim" -- Use Neovim as a language server to inject LSP diagnostics, code actions, and more via Lua
    use "williamboman/mason.nvim"
    use "williamboman/mason-lspconfig.nvim"
    use "hrsh7th/nvim-cmp"     -- Completion
    use "hrsh7th/cmp-buffer"   -- nvim-cmp source for buffer words
    use "hrsh7th/cmp-nvim-lsp" -- nvim-cmp source for neovim's built-in LSP

    -- Theming
    use "tanvirtin/monokai.nvim"
    use "patstockwell/vim-monokai-tasty"
    use "folke/tokyonight.nvim"
    use "jacoborus/tender.vim"
    use 'maxmx03/dracula.nvim'
    use {
        'uloco/bluloco.nvim',
        requires = { 'rktjmp/lush.nvim' }
    }
end)
