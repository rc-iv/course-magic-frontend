const fs = require('fs');
const path = require('path');

const componentName = process.argv[2];

if (!componentName) {
  console.error('Please supply a valid component name');
  process.exit(1);
}

const componentDir = `./src/components/${componentName}`;

if (fs.existsSync(componentDir)) {
  console.error(`Component ${componentName} already exists.`);
  process.exit(1);
}

fs.mkdirSync(componentDir);

const componentContent = `import React from 'react';

const ${componentName}: React.FC = () => {
  return (
    <div>
      ${componentName} Component
    </div>
  );
};

export default ${componentName};
`;

const testContent = `import React from 'react';
import { render } from '@testing-library/react';
import ${componentName} from './${componentName}';

test('renders ${componentName}', () => {
  const { getByText } = render(<${componentName} />);
  const element = getByText(/${componentName} Component/i);
  expect(element).toBeInTheDocument();
});
`;

const cssContent = `/* Add your styles here */`;

fs.writeFileSync(path.join(componentDir, `${componentName}.tsx`), componentContent);
fs.writeFileSync(path.join(componentDir, `${componentName}.test.tsx`), testContent);
fs.writeFileSync(path.join(componentDir, `${componentName}.module.css`), cssContent);

console.log(`Component ${componentName} created.`);
