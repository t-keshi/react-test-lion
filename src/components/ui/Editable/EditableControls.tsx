import { Button } from '@mui/material';
import { Edit } from '@mui/icons-material';
import { Flex } from '../Flex/Flex';

interface Props {
  isEditing: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  onEdit: () => void;
}

export const EditableControls: React.VFC<Props> = ({ isEditing, onSubmit, onCancel, onEdit }) =>
  isEditing ? (
    <Flex sx={{ columnGap: 2 }}>
      <Button onClick={onCancel}>キャンセル</Button>
      <Button onClick={onSubmit}>保存</Button>
    </Flex>
  ) : (
    <Button startIcon={<Edit />} onClick={onEdit}>
      編集
    </Button>
  );
