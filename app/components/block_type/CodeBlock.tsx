import CodeEditor from '@uiw/react-textarea-code-editor';

const code = "console.log('Code Mirror!');";

const CodeBlock = () => {
  return (
    <div className='w-full overflow-hidden rounded'>
      <CodeEditor
        value={code}
        language='js'
        padding={15}
        style={{
          fontSize: 12,
          backgroundColor: '#f5f5f5',
          fontFamily:
            'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
        }}
      />
    </div>
  );
};

export default CodeBlock;
