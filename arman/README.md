# Arman Singh Jaryal - Personal Website

This is a personal website/portfolio built with Jekyll and the Yat theme, showcasing my research, projects, and professional information.

## Structure

```
arman/
├── _config.yml          # Site configuration
├── _layouts/            # Page layouts
├── _includes/           # Reusable components
├── _posts/              # Blog posts
├── _sass/               # SCSS stylesheets
├── assets/              # Images and CSS
├── index.html           # Home page
├── about.html           # About page
└── README.md            # This file
```

## Features

- Responsive design with modern flat style
- Dark/Light mode support (via Yat theme)
- Blog-ready structure
- SEO optimized
- RSS feed support

## Getting Started

### Prerequisites
- Ruby (2.6 or higher)
- Jekyll (4.3 or higher)
- Bundler

### Installation

1. Navigate to this directory:
   ```bash
   cd c:\Users\arman\OneDrive\Desktop\Website\arman
   ```

2. Install dependencies:
   ```bash
   bundle install
   ```

3. Run the development server:
   ```bash
   bundle exec jekyll serve
   ```

4. Visit `http://localhost:4000` in your browser

## Customization

Edit `_config.yml` to customize:
- Site title and description
- Author information
- Social media links
- Other site settings

## Adding Content

### New Blog Posts
Create files in `_posts/` with the format: `YYYY-MM-DD-title.md`

### New Pages
Create `.md` or `.html` files in the root directory or subdirectories

## Deployment

This site can be deployed to GitHub Pages by pushing to a GitHub repository.

## Theme

Built with [Jekyll Theme Yat](https://github.com/jeffreytse/jekyll-theme-yat)

## License

See LICENSE file for details
