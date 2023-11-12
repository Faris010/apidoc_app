'use client';

import { useEffect, useState } from 'react';
import CodeEditor from '@uiw/react-textarea-code-editor';
import { TBLock } from '@/types/types';
import useDebounce from '@/hooks/useDebounce';
import { editBlock } from '@/services/block';

interface Props {
  block: TBLock;
}

const CodeBlock = ({ block }: Props) => {
  const [codeBlockValue, setCodeBlockValue] = useState<string | null>(
    block?.content || null
  );

  const debouncedValue = useDebounce(codeBlockValue, 1500);

  const updateCode = async (updatedContent: string) => {
    const updatedBlock = { ...block, content: updatedContent };
    await editBlock(updatedBlock);
  };

  useEffect(() => {
    if (debouncedValue != null && debouncedValue != block?.content) {
      updateCode(debouncedValue);
      console.log('Update');
    }
  }, [debouncedValue]);

  const handleCodeBlockChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCodeBlockValue(e.target.value);
  };

  return (
    <div data-color-mode='light' className='w-full overflow-hidden rounded'>
      <CodeEditor
        value={codeBlockValue || ''}
        language='js'
        placeholder='Please enter code.'
        onChange={handleCodeBlockChange}
        padding={15}
        style={{
          fontFamily:
            'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
          fontSize: 12,
        }}
      />
    </div>
  );
};

export default CodeBlock;
