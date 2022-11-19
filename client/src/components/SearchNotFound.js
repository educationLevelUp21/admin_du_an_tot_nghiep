import PropTypes from 'prop-types';
// material
import { Paper, Typography } from '@mui/material';

// ----------------------------------------------------------------------

SearchNotFound.propTypes = {
  searchQuery: PropTypes.string,
};

export default function SearchNotFound({ searchQuery = '', ...other }) {
  return (
    <Paper {...other}>
      <Typography gutterBottom align="center" variant="subtitle1">
        Không tìm thấy
      </Typography>
      <Typography variant="body2" align="center">
        Không tìm thấy kết quả cho &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>.
        <br />Hãy thử kiểm tra lỗi chính tả hoặc sử dụng các từ hoàn chỉnh.
      </Typography>
    </Paper>
  );
}
