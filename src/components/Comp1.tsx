import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
  }

function Comp1() {
    const [posts, setPosts] = useState<Post[]>([]);
    useEffect(() => {
        axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
          .then(response => {
            setPosts(response.data);
          });
      }, []);
      const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'userId', headerName: 'User ID', width: 150 },
        { field: 'title', headerName: 'Title', width: 300 },
        { field: 'body', headerName: 'Body', width: 500 },
      ];
    

  return (
    <div>
    <div style={{ height: 300, width: '100%' }}>
      <DataGrid rows={posts} columns={columns}  />
    </div>
    </div>
  )
}

export default Comp1