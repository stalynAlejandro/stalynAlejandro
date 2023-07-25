
function ColorMyPencils(colors, transparent)
    local color = colors or 'bluloco-dark'
    vim.cmd.colorscheme(color)

    if transparent == true then
        vim.api.nvim_set_hl(0, "Normal", { bg = 'none' })
        vim.api.nvim_set_hl(0, "NormalFloat", { bg = "#3B4252" })
    end
end

ColorMyPencils()
