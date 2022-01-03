# My Dotfiles Configuration

## Installing HomeBrew
```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### Installing homebrew packages
```shell
brew bundle --file ~/.dotfiles/Brewfile
```

---

## Installing OhMyZSH
```shell
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### Removing default .zshrc
```shell
rm -rf ~/.zshrc
```

### Linking OhMyZSH file
```shell
ln -s ~/.dotfiles/.zshrc ~/.zshrc
```

### Installing OhMyZSH Spaceship theme
```shell
git clone https://github.com/spaceship-prompt/spaceship-prompt.git "$ZSH_CUSTOM/themes/spaceship-prompt" --depth=1

ln -s "$ZSH_CUSTOM/themes/spaceship-prompt/spaceship.zsh-theme" "$ZSH_CUSTOM/themes/spaceship.zsh-theme"
```

### Installing OhMyZSH plugins

```shell
git clone https://github.com/zsh-users/zsh-autosuggestions ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

git clone https://github.com/zsh-users/zsh-completions ${ZSH_CUSTOM:=~/.oh-my-zsh/custom}/plugins/zsh-completions

git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

---

## Linking VSCode files

### Extensions
```shell
ln -s ~/.dotfiles/vscode/extensions ~/.vscode/extensions
```
> After linking: Open VSCode Command Pallete, typing and select for "Check for Extension Updates" option.

### Settings file
```shell
ln -s ~/.dotfiles/vscode/settings.json ~/Library/Application\ Support//Code/User/settings.json
```

## Linking other files

### Git file
```shell
ln -s ~/.dotfiles/.gitconfig ~/.gitconfig
```

---

## Adding development directory
```shell
cd ~ && mkdir ./dev
```

---

## Annotations

### Extract Brew installed packages
```shell
cd ~/.dotfiles && brew bundle dump --force
```

---

## Inspirations

[![Mention](https://img.shields.io/badge/omariosouto-dotfiles-orange.svg)](https://github.com/omariosouto/dotfiles)
[![Mention](https://img.shields.io/badge/maateusilva-dotfiles-blue.svg)](https://github.com/maateusilva/dotfiles)