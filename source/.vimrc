filetype off			"Helps force plugins to load  
filetype plugin indent on	"For plugins to load correctly
let mapleader = "." 		"Mapleaderkey to .

" Basic Settings
set number	
set ruler
set encoding=utf-8

" Search Bindings
set hlsearch			
set incsearch
set ignorecase
set showmatch

" Key Bindings REMAPS
nmap <c-n> :NERDTreeToggle<CR>
				
noremap <c-s> :w<CR> 		
noremap <c-q> :q!<CR> 
noremap <c-w> :x<CR> 
noremap <c-l> :let @/=''<CR>

inoremap jj <Esc>
inoremap <c-s> <Esc>:w<CR> 
inoremap <c-q> <Esc>:q!<CR>
inoremap <c-w> <Esc>:x<CR>

"::::: PLUGINS :::: 

call plug#begin('~/.vim/plugged')
Plug 'elzr/vim-json'
Plug 'preservim/nerdtree'
Plug 'itchyny/lightline.vim'
Plug 'vim-airline/vim-airline'
Plug 'MaxMEllon/vim-jsx-pretty'
Plug 'HerringtonDarkholme/yats.vim'
Plug 'patstockwell/vim-monokai-tasty'
Plug 'styled-components/vim-styled-components'
call plug#end()

" Allow italics
let g:vim_monokai_tasty_italic = 1                    " allow italics, set this before the colorscheme

" Set ColorScheme
colorscheme vim-monokai-tasty                         " set the colorscheme

" Set Background Transparent
hi Normal ctermbg=NONE
