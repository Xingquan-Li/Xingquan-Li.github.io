# Academic Homepage - Xingquan Li

https://Xingquan-Li.github.io/

A modern, responsive academic homepage website.

## Features

- **Modern Design**: Clean and professional layout with smooth animations
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Easy to Customize**: Simple HTML/CSS/JavaScript structure
- **Fast Loading**: Lightweight with no heavy dependencies
- **Accessible**: Semantic HTML and proper navigation

## File Structure

```
academic-homepage/
├── index.html      # Main HTML file
├── styles.css      # All styling
├── script.js       # Interactive features
└── README.md       # This file
```

## Customization

### Personal Information

1. **Name and Title**: Edit the hero section in `index.html`
2. **About Me**: Update the about section with your biography
3. **Research Interests**: Modify the skill tags in the about section
4. **Research Areas**: Update the research cards with your actual research
5. **Publications**: Replace with your actual publications
6. **Education**: Update with your educational background
7. **Contact**: Add your real contact information and social media links

### Styling

- **Colors**: Modify CSS variables in `styles.css` (root section)
- **Fonts**: Change the font-family in the body selector
- **Layout**: Adjust grid and flexbox properties as needed

### Adding Your Photo

Replace the profile placeholder in the hero section:
1. Add your photo to the `academic-homepage` folder
2. Update the `hero-image` div in `index.html`:
   ```html
   <div class="hero-image">
       <img src="your-photo.jpg" alt="Xingquan Li" class="profile-photo">
   </div>
   ```
3. Add CSS for `.profile-photo` in `styles.css`:
   ```css
   .profile-photo {
       width: 300px;
       height: 300px;
       border-radius: 50%;
       object-fit: cover;
       border: 5px solid rgba(255, 255, 255, 0.3);
   }
   ```

## Deployment

### GitHub Pages

1. Create a new repository on GitHub
2. Push all files to the repository
3. Go to Settings > Pages
4. Select the main branch as source
5. Your site will be available at `https://yourusername.github.io/repository-name`

### Other Hosting Options

- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your GitHub repository
- **Your own server**: Upload files via FTP/SFTP

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Feel free to use this template for your own academic homepage.

## Contact

For questions or suggestions, please contact Xingquan Li.

