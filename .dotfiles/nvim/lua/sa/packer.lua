vim.cmd [[packadd packer.nvim]]

return require('packer').startup(function(use)
    use 'wbthomason/packer.nvim'

    -- Github
    -- use "tpope/vim-fugitive"

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
        'nvim-telescope/telescope.nvim', tag = '0.1.5',
        -- or                            , branch = '0.1.x',
        requires = { { 'nvim-lua/plenary.nvim' } }
    }

    -- Tree Explorer
    use {
        'nvim-tree/nvim-tree.lua',
        requires = {
            'nvim-tree/nvim-web-devicons', -- optional
        },
    }

    -- Harpoon
    use 'theprimeagen/harpoon'

    -- Treesitter || Code Sintax
    use("nvim-treesitter/nvim-treesitter", { run = ':TSUpdate' })

    -- Lualine || Colors
    -- use 'nvim-lualine/lualine.nvim'

    -- LSPSaga || Preview
    use "glepnir/lspsaga.nvim"

    -- -- LSP Confi g
    use "neovim/nvim-lspconfig"           -- LSP
    -- use "jose-elias-alvarez/null-ls.nvim" -- Use Neovim as a language server to inject LSP diagnostics, code actions, and more via Lua
    use "williamboman/mason.nvim"
    use "williamboman/mason-lspconfig.nvim"
    use "hrsh7th/nvim-cmp"     -- Completion
    use "hrsh7th/cmp-nvim-lsp" -- nvim-cmp source for neovim's built-in LSP
    use 'L3MON4D3/LuaSnip'
    use 'saadparwaiz1/cmp_luasnip'
    use "rafamadriz/friendly-snippets"

    -- Theming
    -- use "tanvirtin/monokai.nvim"
    use "patstockwell/vim-monokai-tasty"
    -- use "folke/tokyonight.nvim"
    use "jacoborus/tender.vim"
    -- use 'maxmx03/dracula.nvim'
    use {
        'uloco/bluloco.nvim',
        requires = { 'rktjmp/lush.nvim' }
    }
end)
