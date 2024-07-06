import React, { useState } from 'react';
import { departments as deptData } from '../data/department';
import { Checkbox, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';


const DepartmentList: React.FC = () => {
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({});
  const [selected, setSelected] = useState<{ [key: number]: boolean }>({});

  const handleExpandClick = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelect = (id: number, hasSubDepartments: boolean, subIds?: number[]) => {
    setSelected((prev) => {
      const newSelected = { ...prev, [id]: !prev[id] };
      if (hasSubDepartments && subIds) {
        subIds.forEach((subId) => {
          newSelected[subId] = !prev[id];
        });
      } else {
        const parentId = deptData.find(dept => dept.subDepartments?.some(sub => sub.id === id))?.id;
        if (parentId && deptData.find(dept => dept.id === parentId)?.subDepartments?.every(sub => newSelected[sub.id])) {
          newSelected[parentId] = true;
        }
      }
      return newSelected;
    });
  };

  return (
    <List>
      {deptData.map((dept) => (
        <div key={dept.id}>
          <ListItem>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selected[dept.id] || false}
                onClick={() => handleSelect(dept.id, !!dept.subDepartments, dept.subDepartments?.map(sub => sub.id))}
              />
            </ListItemIcon>
            <ListItemText primary={dept.name} />
            {dept.subDepartments && (
              <IconButton edge="end" onClick={() => handleExpandClick(dept.id)}>
                {expanded[dept.id] ? <ExpandLess /> : <ExpandMore />}
              </IconButton>
            )}
          </ListItem>
          {dept.subDepartments && expanded[dept.id] && (
            <List component="div" disablePadding>
              {dept.subDepartments.map((sub) => (
                <ListItem key={sub.id} sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={selected[sub.id] || false}
                      onClick={() => handleSelect(sub.id, false)}
                    />
                  </ListItemIcon>
                  <ListItemText primary={sub.name} />
                </ListItem>
              ))}
            </List>
          )}
        </div>
      ))}
    </List>
  );
};

export default DepartmentList;
