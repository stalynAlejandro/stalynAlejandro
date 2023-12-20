function Theme(colors, transparent)
    if colors == 'monokai' then
        require('monokai').setup {}
    elseif colors == 'monokaiPro' then
        require('monokai').setup { palette = require('monokai').pro }
    elseif colors == 'monokaiSoda' then
        require('monokai').setup { palette = require('monokai').soda }
    elseif colors == 'monokaiRis' then
        require('monokai').setup { palette = require('monokai').ristretto }
    else
        local color = colors or 'dracula'
        vim.cmd.colorscheme(color)
    end

    if transparent == true then
        local highlights = {
            "Normal",
            "LineNr",
            "Folded",
            "NonText",
            "SpecialKey",
            "VertSplit",
            "SignColumn",
            "EndOfBuffer",
            "TablineFill"
        }
        for _, name in pairs(highlights) do
            vim.cmd.highlight(name .. ' guibg=none ctermbg=none')
        end
    end
end

Theme('vim-monokai-tasty', false)
