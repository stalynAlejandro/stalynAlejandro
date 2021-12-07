let mapleader = "." 		"Mapleaderkey to .
" Stop Recording (Temporary)
map q <Nop>

filetype off			"Helps force plugins to load  
filetype plugin indent on	"For plugins to load correctly

" Basic Settings
set nocompatible " Not compatible wiht vi
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
      
" Open new split panes to right and bottom, which feels more natural
set splitbelow
set splitright
    
" Search Bindings
set hlsearch			
set incsearch
set ignorecase

" Cursor In InsertMode
autocmd InsertEnter * set cul
autocmd InsertLeave * set nocul

" Key Bindings REMAPS
" Open terminal with current directory
map <C-t> :let $VIM_DIR=expand('%:p:h')<CR>:bel terminal<CR>cd $VIM_DIR<CR> <C-w>20+

" NerdTree 
" Start NERDTree and put the cursor back in the other window.
autocmd VimEnter * NERDTree | wincmd p

nnoremap <leader>n :NERDTreeFocus<CR>
nnoremap <leader>t :NERDTreeToggle<CR>
nnoremap <leader>f :NERDTreeFind<CR>
nnoremap <leader>r :NERDTree<CR>

" Quicker window movement
nnoremap <C-j> <C-w>j
nnoremap <C-k> <C-w>k
nnoremap <C-h> <C-w>h
nnoremap <C-l> <C-w>l

" Save and Exit
noremap <leader>w :w<CR> 		
noremap <leader>qq :q!<CR> 
noremap <leader>qa :qa!<CR> 
noremap <leader>l :let @/=''<CR>

inoremap jj <Esc>
inoremap <leader>w <Esc>:w<CR> 
inoremap <leader>qq <Esc>:q!<CR>
inoremap <leader>qa :qa!<CR> 

" Find Files 
nnoremap <silent> <C-f> :Rg<CR>
nnoremap <silent> <Leader>f :Files<CR>

nnoremap <silent> <Leader>b :Buffers<CR>
nnoremap <silent> <Leader>/ :BLines<CR>
nnoremap <silent> <Leader>' :Marks<CR>
nnoremap <silent> <Leader>g :Commits<CR>
nnoremap <silent> <Leader>H :Helptags<CR>
nnoremap <silent> <Leader>hh :History<CR>
nnoremap <silent> <Leader>h: :History:<CR>
nnoremap <silent> <Leader>h/ :History/<CR> 

"::::: PLUGINS :::: 

call plug#begin('~/.vim/plugged')

Plug 'prettier/vim-prettier', { 'do': 'yarn install --frozen-lockfile --production' }

Plug 'elzr/vim-json'
Plug 'itchyny/lightline.vim'
Plug 'vim-airline/vim-airline'

" GITHUB
"Plug 'tpope/vim-fugitive'

"Plug 'kristijanhusak/defx-git'

" Colors
Plug 'rrethy/vim-hexokinase', { 'do': 'make hexokinase' }

" Search Files
Plug 'junegunn/fzf.vim'
Plug 'junegunn/fzf', { 'do': { -> fzf#install() } }

" Snippet and Additional Text Editing Support
Plug 'neoclide/coc.nvim', { 'branch': 'release' }

" NerdTree Plugins
Plug 'preservim/nerdtree'
Plug 'Xuyuanp/nerdtree-git-plugin' "showing git status flags

" Themes
Plug 'dracula/vim', { 'as': 'dracula' }

call plug#end()

" Set ColorScheme
let g:dracula_colorterm = 0
colorscheme dracula 

let g:Hexokinase_highlighters = ['backgroundfull']
