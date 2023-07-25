# How does NvChad work

## Basics

First understand the `vim.tbl_deep_extend` function which is used for merging tables and their values recursively.

- The function `vim.tbl_deep_extend` is normally used to merge 2 tables, and its syntax looks like this:

```console
-- table 1
local person = {
    name = "joe",
    age = 19,
}

-- table 2
local someone = {
    name = "siduck",
}

-- "force" will overwrite equal values from the someone table over the person table
local result = vim.tbl_deep_extend("force", person, someone)

-- result : 
{
    name = "siduck", -- as you can see, name has been overwritten
    age = 19,
}

```

To sum up, `tbl_deep_extend` merges dictionary tables recursively (i.e tables which have `key/value` pair but not list).

### Config Structure

```console
├── init.lua ( main init.lua )
│
├── lua
│   │
│   ├── core
│   │   ├── default_config.lua
│   │   ├── mappings.lua
│   │   ├── utils.lua 
│   │   └── init.lua  
│   │
│   ├── plugins
│   │    ├── init.lua 
│   │    └── configs
│   │        ├── cmp.lua
│   │        └── other configs
│   │  
│   │   USER CONFIG  
│   │  
│   ├── custom *
│   │   ├── chadrc.lua
│   │   ├── init.lua
│   │   ├── more files, dirs
```

- `init.lua` - runs whole config.
- `core/default_config` - returns a table of default options in NvChad.
- `core/mappings` - default mappings.
- `core/init` - default globals, nvim options, commands, autocmds
- `core/utils`  - help functions

### Custom config

There are 2 important files in custom dir which extend NvChad:

- `custom/chadrc.lua` meant to override that table in `default_config` file
- `custom/init.lua` runs in the main `init.lua`, its meant to have vim options, globals, autocmds, commands etc.

Chadrc table overrides the default_config table. 

- It's not recommended to make changes outside the `custom` dir, because NvChad config is a repo and it gitignores only the custom dir. 

## Themes 

You can see all themes with the following keymap: `<leader>th`

## Mapping 

If you want to know all the keymaps, you can run:

```
:NvCheatsheet

:Telescope keymaps

```

## Luasnip

NvChad uses `luasnip` plugin for handling snippets, by default it uses `friendly-snippets` plugin which provides snippets for many languages. 

- But you would want to extend or add your own snippets so read *luasnip_docs*

## Globals

```
-- vscode format i.e json files
vim.g.vscode_snippets_path = "your snippets path"

-- snipmate format 
vim.g.snipmate_snippets_path = "your snippets path"

-- lua format 
vim.g.lua_snippets_path = vim.fn.stdpath "config" .. "/lua/custom/lua_snippets"

```

