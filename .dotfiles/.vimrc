let mapleader = "."

map q <Nop>  
nnoremap <c-z> <nop>

:syntax sync fromstart
:set nowrap
:set foldmethod=indent
set clipboard=unnamedplus

set nocompatible
set showcmd
set number	
set ruler
set hidden
set smartindent
set belloff=all
set tabstop=2
set scrolloff=2
set shiftwidth=2
set encoding=UTF-8
set expandtab
set termguicolors
set splitbelow
set splitright
set hlsearch
set incsearch
set ignorecase

augroup remember_folds
  autocmd!
  au BufWinLeave *.ts,*.tsx,*.jsx,*.js mkview 1
  au BufWinEnter *.ts,*.tsx,*.jsx,*.js silent! loadview 1
augroup END

nnoremap <leader>rr :so ~/.vimrc<CR>

autocmd InsertEnter * set cul
autocmd InsertLeave * set nocul
autocmd VimEnter * NERDTree | wincmd p

map <C-t> :let $VIM_DIR=expand('%:p:h')<CR>:bel terminal<CR>cd $VIM_DIR<CR>clear<CR><C-w>J<CR>

nnoremap <leader>n :NERDTreeFocus<CR>
nnoremap <leader>t :NERDTreeToggle<CR>
nnoremap <leader>f :NERDTreeFind<CR>
nnoremap <leader>r :NERDTree<CR>
:let g:NERDTreeWinSize=25

nnoremap <silent> <Leader>` <C-w>=<CR>
nnoremap <silent> <Leader>1 5<C-w>+<CR>
nnoremap <silent> <Leader>2 5<C-w>-<CR>
nnoremap <silent> <Leader>3 5<C-w>><CR>
nnoremap <silent> <Leader>4 5<C-w><<CR>

nnoremap <C-j> <C-w>j
nnoremap <C-k> <C-w>k
nnoremap <C-h> <C-w>h
nnoremap <C-l> <C-w>l

inoremap <leader>y "+y<CR>
inoremap <leader>pp "+p<CR>

noremap <leader>w :w<CR>
"noremap <leader>wa :wqa!<CR> 		
"noremap <leader>x :x<CR> 		
noremap <leader>qq :q!<CR> 
noremap <leader>qa :qa!<CR> 
noremap <leader>l :let @/=''<CR>

inoremap jj <Esc>
inoremap <leader>w <Esc>:w<CR> 
"inoremap <leader>wa <Esc>:wqa!<CR> 
inoremap <leader>qq <Esc>:q!<CR>
inoremap <leader>qa :qa!<CR> 

nnoremap <silent> <Leader>f :Rg<CR>
nnoremap <silent> <Leader>ff :Files<CR>
nnoremap <silent> <Leader>b :Buffers<CR>
nnoremap <silent> <Leader>/ :BLines<CR>
nnoremap <silent> <Leader>' :Marks<CR>
nnoremap <silent> <Leader>g :Commits<CR>
nnoremap <silent> <Leader>H :Helptags<CR>
nnoremap <silent> <Leader>hh :History<CR>
nnoremap <silent> <Leader>h: :History:<CR>
nnoremap <silent> <Leader>h/ :History/<CR> 

map <silent> <C-g>s :Gdiffsplit<CR>
map <silent> <C-g>w :Gwrite<CR>
map <silent> <C-g>r :Gread<CR>

nnoremap <leader>p :call CocAction('runCommand','prettier.formatFile')<CR>
inoremap <silent><expr> <tab> pumvisible() ? coc#_select_confirm() : "\<C-g>u\<TAB>"
inoremap <silent><expr> <cr> "\<c-g>u\<CR>"

let g:coc_user_config = {}
let g:coc_user_config['coc.preferences.jumpCommand'] = ':vsplit'
nmap <silent> gd <Plug>(coc-definition)
nmap <silent> gy <Plug>(coc-type-definition)
nmap <silent> gi <Plug>(coc-implementation)
nmap <silent> gr <Plug>(coc-references)

call plug#begin('~/.vim/plugged') 
  Plug 'mhinz/vim-startify'
  Plug 'itchyny/lightline.vim'
  Plug 'vim-airline/vim-airline'
  Plug 'rrethy/vim-hexokinase', { 'do': 'make hexokinase' }     
  Plug 'junegunn/fzf.vim'                                       
  Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }
  Plug 'neoclide/coc.nvim', { 'branch': 'release' }             
  Plug 'preservim/nerdtree'                                     
  Plug 'leafgarland/typescript-vim'
  Plug 'peitalin/vim-jsx-typescript'
  Plug 'patstockwell/vim-monokai-tasty'
call plug#end()

colorscheme vim-monokai-tasty 
autocmd BufNewFile,BufRead *.tsx,*.jsx,*.ts set filetype=typescriptreact

hi tsxTagName guifg=#66d8ef
hi tsxComponentName guifg=#66d8ef
hi tsxCloseComponentName guifg=#66d8ef
hi tsxCloseTagName guifg=#66d8ef
hi tsxCloseTag guifg=#66d8ef
hi WebBrowser ctermfg=204 guifg=#56B6C2
hi Events ctermfg=204 guifg=#56B6C2
hi tsxCloseString guifg=#179af6
hi tsxAttributeBraces guifg=#179af6
hi tsxEqual guifg=#179af6
hi tsxTypes guifg=#179af6 cterm=italic
hi tsxTypeBraces guifg=#e8296f
hi ReactProps guifg=#e8296f
hi ApolloGraphQL guifg=#e8296f
hi tsxAttrib guifg=#a7e22e cterm=italic
hi ReactState guifg=#a7e22e
hi ReduxKeywords ctermfg=204 guifg=#a7e22e
hi ReduxHooksKeywords ctermfg=204 guifg=#a7e22e
hi ReactLifeCycleMethods ctermfg=204 guifg=#a7e22e
hi Normal guibg=NONE ctermbg=NONE
"hi Normal guibg=#262C3A ctermbg=NONE

let g:startify_custom_header = startify#pad(split(system('figlet -w 100 -l -f slant - VIM21 -'), '\n'))


:iab _ife if err != nil {<CR><tab>return err<CR>}<CR> 
:iab _html <!DOCTYPE html><CR><html lang="en"><CR><head><CR><meta charset="UTF-8"><CR><meta name="viewport" content="width=device-width, initial-scale=1"><CR><title>Document</title><CR></head><CR><body><CR></body><CR></html>

