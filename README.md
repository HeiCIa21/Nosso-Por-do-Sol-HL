# 🌅 Pôr do Sol - Site de Pedido de Namoro

Um site romântico e interativo criado por Heitor para fazer uma declaração especial para Lívia.

## 📋 Sobre o Projeto

Este é um site estático responsivo com tema "Pôr do Sol" que inclui:
- **Hero animado** com gradiente de pôr do sol
- **Galeria de fotos** estilo polaroid com efeitos 3D
- **Player de música** persistente
- **Seção de vídeo** com embed do Kapwing e fallback local
- **Modal interativo** para o pedido de namoro
- **Animações** suaves e confetes de celebração
- **Design responsivo** para todos os dispositivos

## 🎨 Paleta de Cores

```css
--sunset-orange: #FF6F61
--sunset-yellow: #FFC371
--sunset-pink: #FF9A8B
--sky-blue: #8EC5FC
--sky-lavender: #E0C3FC
```

## 📁 Estrutura de Arquivos

```
livia-sol/
├── index.html              # Página principal
├── README.md              # Este arquivo
├── assets/
│   ├── css/
│   │   └── styles.css     # Estilos completos
│   ├── js/
│   │   └── main.js        # JavaScript interativo
│   ├── music/
│   │   └── Amanda.mp3     # Música de fundo (você precisa adicionar)
│   ├── videos/
│   │   ├── por-do-sol.mp4          # Vídeo local (você precisa adicionar)
│   │   └── por-do-sol-poster.jpg   # Thumbnail do vídeo (você precisa adicionar)
│   └── images/            # Pasta para imagens adicionais (opcional)
```

## 🚀 Como Usar

### 1. Adicionar o Arquivo de Música

1. Localize o arquivo de música "Amanda.mp3" (ou sua música escolhida)
2. Copie o arquivo para a pasta `assets/music/`
3. Se o arquivo tiver outro nome, atualize a linha 27 do `index.html`:
   ```html
   <source src="assets/music/SEU_ARQUIVO.mp3" type="audio/mpeg">
   ```

### 2. Adicionar o Vídeo do Kapwing

#### Opção A: Usar o Embed do Kapwing (Recomendado)

O site já está configurado para carregar o vídeo diretamente do Kapwing:
- URL: https://www.kapwing.com/e/6907fd379265c8db70943286
- Nenhuma ação necessária, o embed já está no HTML

#### Opção B: Baixar e Hospedar Localmente (Fallback)

Para garantir que o vídeo funcione mesmo se o Kapwing estiver indisponível:

1. **Baixar o vídeo do Kapwing:**
   - Acesse: https://www.kapwing.com/videos/6907fd379265c8db70943286
   - Clique em "Export" ou "Download"
   - Escolha a qualidade desejada (recomendado: 1080p ou 720p)
   - Baixe o vídeo no formato MP4

2. **Salvar o vídeo:**
   - Renomeie o arquivo baixado para `por-do-sol.mp4`
   - Mova o arquivo para `assets/videos/por-do-sol.mp4`

3. **Criar um poster (thumbnail):**
   - Abra o vídeo em qualquer player
   - Pause em um frame bonito
   - Tire um screenshot
   - Salve como `por-do-sol-poster.jpg` em `assets/videos/`
   - Ou use qualquer imagem de pôr do sol

4. **Alternativa - Converter/Otimizar o vídeo (opcional):**
   ```bash
   # Se você tiver FFmpeg instalado, pode otimizar o vídeo:
   ffmpeg -i input.mp4 -vcodec h264 -acodec aac -b:v 2M assets/videos/por-do-sol.mp4
   
   # Criar poster automaticamente:
   ffmpeg -i assets/videos/por-do-sol.mp4 -ss 00:00:05 -vframes 1 assets/videos/por-do-sol-poster.jpg
   ```

### 3. Customizar o Conteúdo

#### Alterar os Textos

Edite o arquivo `index.html` e procure pelas seguintes seções:

- **Linha 48:** Título do hero (`Para Minha Nega`)
- **Linha 49:** Subtítulo (`Cada pôr do sol me lembra de você`)
- **Linhas 64-74:** Texto da seção "Nossa História"
- **Linhas 223-227:** Texto do pedido
- **Linhas 241-249:** Declaração no modal
- **Linhas 272-276:** Mensagem de celebração

#### Alterar as Fotos

As fotos atuais estão hospedadas no ImgBB. Para trocar:

1. Faça upload das suas fotos em um serviço de hospedagem (ImgBB, Imgur, Cloudinary)
2. Substitua as URLs nas linhas 89, 95, 101, 107, 113 do `index.html`
3. Ou salve as fotos localmente em `assets/images/` e use caminhos relativos:
   ```html
   <img src="assets/images/foto1.jpg" alt="Momento especial 1" loading="lazy">
   ```

#### Alterar as Legendas das Fotos

Edite as linhas 91, 97, 103, 109, 115 do `index.html` para personalizar as legendas dos polaroids.

### 4. Trocar o Vídeo do Kapwing

Se você quiser usar um vídeo diferente do Kapwing:

1. Edite as linhas 139, 159, 189, 214 do `index.html`
2. Substitua a URL `https://www.kapwing.com/e/6907fd379265c8db70943286` pela nova URL de embed
3. Substitua a URL `https://www.kapwing.com/videos/6907fd379265c8db70943286` pela nova URL de visualização

## 🌐 Como Hospedar

### Opção 1: Netlify (Recomendado - Gratuito)

1. Crie uma conta em [Netlify](https://www.netlify.com/)
2. Instale o Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
3. Na pasta do projeto, execute:
   ```bash
   netlify deploy
   ```
4. Siga as instruções e escolha a opção "production"
5. Seu site estará online em uma URL como: `https://seu-site.netlify.app`

### Opção 2: Vercel (Gratuito)

1. Crie uma conta em [Vercel](https://vercel.com/)
2. Instale o Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Execute:
   ```bash
   vercel
   ```
4. Siga as instruções

### Opção 3: GitHub Pages (Gratuito)

1. Crie um repositório no GitHub
2. Faça upload dos arquivos
3. Nas configurações do repositório, ative o GitHub Pages
4. Escolha a branch `main` e a pasta raiz `/`
5. Seu site estará em `https://seu-usuario.github.io/nome-do-repo/`

### Opção 4: Servidor Local (Teste)

Para testar localmente antes de hospedar:

```bash
# Opção 1: Python (se você tiver instalado)
python -m http.server 8000

# Opção 2: Node.js (se você tiver instalado)
npx http-server

# Opção 3: PHP (se você tiver instalado)
php -S localhost:8000
```

Depois acesse: `http://localhost:8000`

## ⚙️ Funcionalidades Técnicas

### Player de Música
- Botão play/pause flutuante
- Salva preferência do usuário no localStorage
- Loop automático
- Respeita políticas de autoplay dos navegadores

### Vídeo
- **Lazy loading:** Carrega apenas quando o usuário clica
- **Fallback automático:** Se o Kapwing falhar, carrega vídeo local
- **Responsivo:** Mantém proporção 16:9 em todos os dispositivos
- **Controles:** Download, abrir em nova aba, tela cheia
- **Acessibilidade:** Title, aria-labels, alternativas textuais

### Interações
- **Scroll suave** para navegação
- **Animações on-scroll** com IntersectionObserver
- **Efeito tilt 3D** nos polaroids (desktop)
- **Lightbox** para ampliar fotos
- **Confetes animados** na celebração
- **Modais** acessíveis com foco trap

### Performance
- Lazy loading de imagens nativo
- IntersectionObserver para animações eficientes
- CSS otimizado com variáveis
- JavaScript modular e comentado

## 🛠️ Personalização Avançada

### Mudar as Cores

Edite o arquivo `assets/css/styles.css` nas linhas 5-10:

```css
:root {
    --sunset-orange: #FF6F61;  /* Cor principal */
    --sunset-yellow: #FFC371;  /* Amarelo */
    --sunset-pink: #FF9A8B;    /* Rosa */
    --sky-blue: #8EC5FC;       /* Azul */
    --sky-lavender: #E0C3FC;   /* Lavanda */
}
```

### Adicionar Novas Fotos na Galeria

Copie o bloco abaixo e cole dentro da `<div class="polaroid-grid">` (linha 86):

```html
<div class="polaroid" data-tilt>
    <div class="polaroid-image">
        <img src="URL_DA_FOTO" alt="Descrição" loading="lazy">
    </div>
    <p class="polaroid-caption">Legenda da foto</p>
</div>
```

### Mudar Fontes

As fontes atuais são:
- **Dancing Script** (títulos)
- **Poppins** (corpo)

Para mudar, edite a linha 11 do `index.html` e as linhas 21-22 do `styles.css`.

## 🐛 Resolução de Problemas

### A música não toca
- Verifique se o arquivo está em `assets/music/Amanda.mp3`
- Alguns navegadores bloqueiam autoplay - o usuário precisa clicar no botão play
- Verifique o console do navegador (F12) para erros

### O vídeo não carrega
- Certifique-se de que o arquivo está em `assets/videos/por-do-sol.mp4`
- Verifique se o formato é MP4 com codec H.264
- O embed do Kapwing pode ser bloqueado por AdBlockers
- Tente clicar no botão "Carregar vídeo" manualmente

### As fotos não aparecem
- Verifique se as URLs do ImgBB estão corretas
- Se usar fotos locais, confirme os caminhos relativos
- Abra o console (F12) para ver erros de carregamento

### Site não funciona em hospedagem
- Verifique se todos os arquivos foram enviados
- Confirme os caminhos relativos (devem começar com `assets/`)
- Alguns hosts requerem `index.html` como página inicial
- Se usar HTTPS, todos os recursos devem ser HTTPS também

## 📱 Compatibilidade

### Navegadores Suportados
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+
- ✅ Navegadores mobile modernos

### Recursos Utilizados
- CSS Grid & Flexbox
- CSS Variables
- IntersectionObserver API
- LocalStorage API
- Web Animations API
- HTML5 Video & Audio

## 📄 Licença

Este projeto foi criado especificamente para Heitor e Lívia. 
Sinta-se livre para adaptar para seu próprio uso romântico! ❤️

## 💝 Mensagem Final

Heitor, espero que este site ajude você a expressar todo o amor que sente pela Lívia.
Boa sorte com o pedido de namoro! 🌅

---

**Criado com ❤️ especialmente para este momento especial**

**Data de criação:** Novembro de 2025

**Dúvidas?** Abra o console do navegador (F12) para ver mensagens de debug e possíveis erros.
