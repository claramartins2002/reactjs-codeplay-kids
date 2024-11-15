import { useMemo } from 'react';
import ColorUtils from '../Colors';

const useStudentColors = (studentsData) => useMemo(() => {
  return studentsData.reduce((colors, student) => {
    colors[student.id] = ColorUtils.getRandomColor(500);
    return colors;
  }, {});
}, [studentsData]);

export default useStudentColors;
