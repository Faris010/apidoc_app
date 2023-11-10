import { forwardRef } from 'react';

interface Props {
  handleBlockTextarea: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  blockTypeId: number;
}

const ParagraphBlock = forwardRef<HTMLTextAreaElement, Props>(
  ({ handleBlockTextarea, blockTypeId }, ref) => {
    return (
      <textarea
        rows={1}
        ref={ref}
        name='block'
        onChange={handleBlockTextarea}
        className={`${
          blockTypeId != 1 && 'hidden'
        } w-full rounded outline-none resize-none overflow-hidden text-[#3E4248]`}
        placeholder="Type '/' for commands"
      />
    );
  }
);

export default ParagraphBlock;
