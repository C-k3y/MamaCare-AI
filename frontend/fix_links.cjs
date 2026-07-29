const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
    fs.readdirSync(dir).forEach(file => {
        const filepath = path.join(dir, file);
        if (fs.statSync(filepath).isDirectory()) {
            filelist = walkSync(filepath, filelist);
        } else if (filepath.endsWith('.jsx')) {
            filelist.push(filepath);
        }
    });
    return filelist;
};

const files = walkSync('./src');
let changedFiles = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let original = content;

    // Replace <a href="/something"> to <Link to="/something">
    content = content.replace(/<a(\s+[^>]*)href="(\/[^"]*)"([^>]*)>(.*?)<\/a>/g, '<Link$1to="$2"$3>$4</Link>');
    
    // Also replace href={`/${something}`} to to={`/${something}`}
    content = content.replace(/<a(\s+[^>]*)href=\{`(\/[^`]+)`\}([^>]*)>(.*?)<\/a>/g, '<Link$1to={`$2`}$3>$4</Link>');

    if (content !== original) {
        // Ensure Link is imported from react-router-dom
        if (!content.includes('import { Link } from') && !content.includes('import { Link,')) {
            // Check if react-router-dom is already imported
            if (content.includes('from \'react-router-dom\'') || content.includes('from "react-router-dom"')) {
                content = content.replace(/import\s+\{([^}]+)\}\s+from\s+['"]react-router-dom['"];/, (match, p1) => {
                    return `import { ${p1.trim()}, Link } from 'react-router-dom';`;
                });
            } else {
                // Add import to top after React
                content = content.replace(/import React[^;]*;/, "$&\nimport { Link } from 'react-router-dom';");
                if (!content.includes('import { Link }')) {
                     content = "import { Link } from 'react-router-dom';\n" + content;
                }
            }
        }
        fs.writeFileSync(file, content, 'utf8');
        changedFiles++;
        console.log('Updated: ' + file);
    }
});

console.log('Total files updated: ' + changedFiles);
