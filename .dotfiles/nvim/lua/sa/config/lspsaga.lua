local status, saga = pcall(require, 'lspsaga')
if (not status) then return end

saga.setup({
    ui = {
        code_action = ''
    },
    definition = {
        keys = {
            vsplit = '<C-v>',
            split = '<C-x>',
            table = '<C-t>',
            quit = 'q',
            close = '<Esc>',
        }
    }
})
