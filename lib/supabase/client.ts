import { createBrowserClient } from '@supabase/ssr'

export const createClient = () => {
  const client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  if (process.env.NEXT_PUBLIC_MOCK_AUTH === 'true') {
    const seedMockUsers = () => {
      if (typeof window !== 'undefined') {
        const mockUsers: any[] = JSON.parse(localStorage.getItem('mock_users') || '[]')
        const defaultAccounts = [
          { id: 'ddbdc6a9-0602-47a0-9122-52901ae15855', email: 'participant@test.com', role: 'participant' },
          { id: '52a03e89-f5fd-449a-8c8e-da5f3331975c', email: 'admin@test.com', role: 'admin' },
          { id: 'db97b9f4-8d9c-4686-a6ed-40d1f56a36dd', email: 'jury@test.com', role: 'jury' },
          { id: '4c54426a-1625-4fe7-8174-7cc514262d1f', email: 'college@test.com', role: 'college' }
        ]
        let updated = false
        for (const acc of defaultAccounts) {
          if (!mockUsers.some(u => u.email === acc.email)) {
            mockUsers.push({
              id: acc.id,
              email: acc.email,
              password: 'password',
              user_metadata: {
                full_name: acc.email.split('@')[0],
                role: acc.role,
                college_name: acc.role === 'college' ? 'PSNA' : undefined
              }
            })
            updated = true
          }
        }
        if (updated) {
          localStorage.setItem('mock_users', JSON.stringify(mockUsers))
        }

        // Seed default colleges if missing
        if (!localStorage.getItem('mock_colleges')) {
          const defaultColleges = [
            { id: '4c54426a-1625-4fe7-8174-7cc514262d1f', college_name: 'PSNA', email: 'college@test.com', password: 'password', status: 'active', created_at: new Date().toISOString() },
            { id: 'mit-college-id-12345', college_name: 'MIT', email: 'mit@college.com', password: 'password', status: 'active', created_at: new Date().toISOString() },
            { id: 'anna-college-id-12345', college_name: 'Anna University', email: 'anna@college.com', password: 'password', status: 'active', created_at: new Date().toISOString() },
            { id: 'thiagarajar-college-id', college_name: 'Thiagarajar', email: 'thiagarajar@college.com', password: 'password', status: 'active', created_at: new Date().toISOString() }
          ]
          localStorage.setItem('mock_colleges', JSON.stringify(defaultColleges))
          
          // Seed the colleges users so they can log in
          const users = JSON.parse(localStorage.getItem('mock_users') || '[]')
          let usersUpdated = false
          for (const col of defaultColleges) {
            if (!users.some((u: any) => u.email === col.email)) {
              users.push({
                id: col.id,
                email: col.email,
                password: col.password,
                user_metadata: {
                  full_name: col.college_name,
                  role: 'college',
                  college_name: col.college_name
                }
              })
              usersUpdated = true
            }
          }
          if (usersUpdated) {
            localStorage.setItem('mock_users', JSON.stringify(users))
          }
        }
      }
    }

    const mockAuth = {
      getUser: async () => {
        seedMockUsers()
        if (typeof window !== 'undefined') {
          const mockUserJson = localStorage.getItem('mock_user')
          if (mockUserJson) {
            return { data: { user: JSON.parse(mockUserJson) }, error: null as any }
          }
        }
        return { data: { user: null }, error: null as any }
      },
      getSession: async () => {
        seedMockUsers()
        if (typeof window !== 'undefined') {
          const mockUserJson = localStorage.getItem('mock_user')
          if (mockUserJson) {
            return { data: { session: { user: JSON.parse(mockUserJson) } }, error: null as any }
          }
        }
        return { data: { session: null }, error: null as any }
      },
      signInWithPassword: async ({ email, password }: any) => {
        seedMockUsers()
        if (typeof window !== 'undefined') {
          const mockUsers: any[] = JSON.parse(localStorage.getItem('mock_users') || '[]')
          let found = mockUsers.find((u: any) => u.email === email && u.password === password)
          
          if (!found) {
            // Auto-seed typical development test accounts for convenience
            let role = 'participant'
            let id = 'ddbdc6a9-0602-47a0-9122-52901ae15855'
            let collegeName = undefined
            if (email.includes('admin')) {
              role = 'admin'
              id = '52a03e89-f5fd-449a-8c8e-da5f3331975c'
            } else if (email.includes('jury')) {
              role = 'jury'
              id = 'db97b9f4-8d9c-4686-a6ed-40d1f56a36dd'
            } else if (email.includes('college')) {
              role = 'college'
              id = '4c54426a-1625-4fe7-8174-7cc514262d1f'
              collegeName = 'PSNA'
            }

            found = {
              id,
              email,
              password,
              user_metadata: {
                full_name: email.split('@')[0],
                role,
                college_name: collegeName
              }
            }
            mockUsers.push(found)
            localStorage.setItem('mock_users', JSON.stringify(mockUsers))
          }

          if (found) {
            localStorage.setItem('mock_user', JSON.stringify(found))
            // Set cookie for middleware
            document.cookie = `mock_user=${encodeURIComponent(JSON.stringify(found))}; path=/; max-age=3600`
            return { data: { user: found, session: {} }, error: null as any }
          }
        }
        return { data: { user: null, session: null }, error: { message: 'Invalid credentials in mock auth store.' } as any }
      },
      signUp: async ({ email, password, options }: any) => {
        if (typeof window !== 'undefined') {
          const mockUsers: any[] = JSON.parse(localStorage.getItem('mock_users') || '[]')
          if (mockUsers.some((u: any) => u.email === email)) {
            return { data: { user: null, session: null }, error: { message: 'User email already registered in mock auth store.' } as any }
          }
          
          let role = options?.data?.role || 'participant'
          if (email.includes('admin')) role = 'admin'
          else if (email.includes('jury')) role = 'jury'
          else if (email.includes('college')) role = 'college'

          let id = 'ddbdc6a9-0602-47a0-9122-52901ae15855'
          if (role === 'admin') id = '52a03e89-f5fd-449a-8c8e-da5f3331975c'
          else if (role === 'jury') id = 'db97b9f4-8d9c-4686-a6ed-40d1f56a36dd'
          else if (role === 'college') id = '4c54426a-1625-4fe7-8174-7cc514262d1f'
          else {
            id = Math.random().toString(36).substring(2, 9) + '-' + Math.random().toString(36).substring(2, 9)
          }
 
          const newUser = {
            id,
            email,
            password,
            user_metadata: {
              ...options?.data,
              role
            }
          }
          mockUsers.push(newUser)
          localStorage.setItem('mock_users', JSON.stringify(mockUsers))
          localStorage.setItem('mock_user', JSON.stringify(newUser))
          // Set cookie for middleware
          document.cookie = `mock_user=${encodeURIComponent(JSON.stringify(newUser))}; path=/; max-age=3600`
          return { data: { user: newUser, session: {} }, error: null as any }
        }
        return { data: { user: null, session: null }, error: { message: 'Signup failed.' } as any }
      },
      signOut: async () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('mock_user')
          document.cookie = 'mock_user=; path=/; max-age=0'
        }
        return { error: null as any }
      }
    }

    class MockQueryBuilder {
      private tableName: string;
      private filters: Array<{ col: string; val: any; op: 'eq' | 'in' }> = [];
      private selectedColumns: string = '*';
      private singleResult: boolean = false;
      private maybeSingleResult: boolean = false;
      private valuesToInsert: any = null;
      private valuesToUpdate: any = null;
      private isDelete: boolean = false;
      private orderCol: string | null = null;
      private orderAscending: boolean = true;
      private limitVal: number | null = null;

      constructor(tableName: string) {
        this.tableName = tableName;
      }

      select(columns: string = '*') {
        this.selectedColumns = columns;
        return this;
      }

      insert(values: any) {
        this.valuesToInsert = values;
        return this;
      }

      update(values: any) {
        this.valuesToUpdate = values;
        return this;
      }

      delete() {
        this.isDelete = true;
        return this;
      }

      eq(column: string, value: any) {
        this.filters.push({ col: column, val: value, op: 'eq' });
        return this;
      }

      in(column: string, values: any[]) {
        this.filters.push({ col: column, val: values, op: 'in' });
        return this;
      }

      single() {
        this.singleResult = true;
        return this;
      }

      maybeSingle() {
        this.maybeSingleResult = true;
        return this;
      }

      order(column: string, options?: { ascending?: boolean }) {
        this.orderCol = column;
        this.orderAscending = options?.ascending !== false;
        return this;
      }

      limit(n: number) {
        this.limitVal = n;
        return this;
      }

      async then(resolve: any, reject?: any) {
        try {
          const data = await this.execute();
          if (resolve) resolve({ data, error: null });
        } catch (err: any) {
          if (resolve) resolve({ data: null, error: { message: err.message } });
        }
      }

      private async execute() {
        if (typeof window === 'undefined') {
          return (this.singleResult || this.maybeSingleResult) ? null : [];
        }

        seedMockUsers();

        // ------------------ USERS TABLE ------------------
        if (this.tableName === 'users') {
          const mockUserJson = localStorage.getItem('mock_user');
          const mockUser = mockUserJson ? JSON.parse(mockUserJson) : null;
          const mockUsers: any[] = JSON.parse(localStorage.getItem('mock_users') || '[]');
          const mockProfiles = JSON.parse(localStorage.getItem('mock_user_profiles') || '{}');

          if (mockUser && !mockProfiles[mockUser.id]) {
            mockProfiles[mockUser.id] = {
              id: mockUser.id,
              email: mockUser.email,
              full_name: mockUser.user_metadata?.full_name || 'Participant',
              role: mockUser.user_metadata?.role || 'participant',
              created_at: new Date().toISOString()
            };
            localStorage.setItem('mock_user_profiles', JSON.stringify(mockProfiles));
          }

          // Handle insert
          if (this.valuesToInsert) {
            const profiles = Array.isArray(this.valuesToInsert) ? this.valuesToInsert : [this.valuesToInsert];
            for (const profile of profiles) {
              mockProfiles[profile.id] = {
                ...mockProfiles[profile.id],
                ...profile
              };
            }
            localStorage.setItem('mock_user_profiles', JSON.stringify(mockProfiles));
            return this.singleResult ? profiles[0] : profiles;
          }

          // Handle update
          if (this.valuesToUpdate) {
            const filterId = this.filters.find(f => f.col === 'id')?.val;
            if (filterId) {
              mockProfiles[filterId] = {
                ...mockProfiles[filterId],
                ...this.valuesToUpdate
              };
              localStorage.setItem('mock_user_profiles', JSON.stringify(mockProfiles));
            }
            return this.valuesToUpdate;
          }

          // Handle delete
          if (this.isDelete) {
            const filterId = this.filters.find(f => f.col === 'id')?.val;
            if (filterId) {
              delete mockProfiles[filterId];
              localStorage.setItem('mock_user_profiles', JSON.stringify(mockProfiles));
            }
            return [];
          }

          // Handle select
          let list = Object.values(mockProfiles);
          if (list.length === 0 && mockUser) {
            list = [mockProfiles[mockUser.id]];
          }

          for (const u of mockUsers) {
            if (!mockProfiles[u.id]) {
              list.push({
                id: u.id,
                email: u.email,
                full_name: u.user_metadata?.full_name || 'Participant',
                role: u.user_metadata?.role || 'participant',
                created_at: new Date().toISOString()
              });
            }
          }

          // Apply filters
          for (const filter of this.filters) {
            if (filter.op === 'in') {
              list = list.filter((item: any) => filter.val.includes(item[filter.col]));
            } else {
              list = list.filter((item: any) => item[filter.col] === filter.val);
            }
          }

          if (this.singleResult || this.maybeSingleResult) {
            return list[0] || null;
          }
          return list;
        }

        // ------------------ COLLEGES TABLE ------------------
        if (this.tableName === 'colleges') {
          let colleges: any[] = JSON.parse(localStorage.getItem('mock_colleges') || '[]');

          // Handle insert
          if (this.valuesToInsert) {
            const rows = Array.isArray(this.valuesToInsert) ? this.valuesToInsert : [this.valuesToInsert];
            const inserted: any[] = [];
            for (const r of rows) {
              const newCol = {
                id: r.id || Math.random().toString(36).substring(2, 9) + '-' + Math.random().toString(36).substring(2, 9),
                college_name: r.college_name,
                email: r.email,
                password: r.password || 'password',
                status: r.status || 'active',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              };
              colleges.push(newCol);
              inserted.push(newCol);

              // Auto-create in mock_users & mock_user_profiles
              const mockUsers: any[] = JSON.parse(localStorage.getItem('mock_users') || '[]');
              if (!mockUsers.some(u => u.email === newCol.email)) {
                mockUsers.push({
                  id: newCol.id,
                  email: newCol.email,
                  password: newCol.password,
                  user_metadata: {
                    full_name: newCol.college_name,
                    role: 'college',
                    college_name: newCol.college_name
                  }
                });
                localStorage.setItem('mock_users', JSON.stringify(mockUsers));
              }
              const mockProfiles = JSON.parse(localStorage.getItem('mock_user_profiles') || '{}');
              mockProfiles[newCol.id] = {
                id: newCol.id,
                email: newCol.email,
                full_name: newCol.college_name,
                role: 'college',
                created_at: new Date().toISOString()
              };
              localStorage.setItem('mock_user_profiles', JSON.stringify(mockProfiles));
            }
            localStorage.setItem('mock_colleges', JSON.stringify(colleges));
            return this.singleResult ? inserted[0] : inserted;
          }

          // Handle update
          if (this.valuesToUpdate) {
            let updatedRows: any[] = [];
            colleges = colleges.map(col => {
              let match = true;
              for (const filter of this.filters) {
                if (filter.op === 'in') {
                  if (!filter.val.includes(col[filter.col])) match = false;
                } else {
                  if (col[filter.col] !== filter.val) match = false;
                }
              }
              if (match) {
                const updated = {
                  ...col,
                  ...this.valuesToUpdate,
                  updated_at: new Date().toISOString()
                };
                updatedRows.push(updated);
                
                // Keep auth users in sync if credentials changed
                const mockUsers = JSON.parse(localStorage.getItem('mock_users') || '[]');
                const uIdx = mockUsers.findIndex((u: any) => u.id === col.id);
                if (uIdx !== -1) {
                  mockUsers[uIdx].email = updated.email;
                  mockUsers[uIdx].password = updated.password;
                  mockUsers[uIdx].user_metadata.full_name = updated.college_name;
                  localStorage.setItem('mock_users', JSON.stringify(mockUsers));
                }
                
                return updated;
              }
              return col;
            });
            localStorage.setItem('mock_colleges', JSON.stringify(colleges));
            return this.singleResult ? updatedRows[0] : updatedRows;
          }

          // Handle delete
          if (this.isDelete) {
            colleges = colleges.filter(col => {
              let match = true;
              for (const filter of this.filters) {
                if (filter.op === 'in') {
                  if (!filter.val.includes(col[filter.col])) match = false;
                } else {
                  if (col[filter.col] !== filter.val) match = false;
                }
              }
              if (match) {
                // Delete from mock users too
                const mockUsers = JSON.parse(localStorage.getItem('mock_users') || '[]');
                const filteredUsers = mockUsers.filter((u: any) => u.id !== col.id);
                localStorage.setItem('mock_users', JSON.stringify(filteredUsers));
                
                const mockProfiles = JSON.parse(localStorage.getItem('mock_user_profiles') || '{}');
                delete mockProfiles[col.id];
                localStorage.setItem('mock_user_profiles', JSON.stringify(mockProfiles));
                return false;
              }
              return true;
            });
            localStorage.setItem('mock_colleges', JSON.stringify(colleges));
            return [];
          }

          // Handle select
          let list = colleges;
          for (const filter of this.filters) {
            if (filter.op === 'in') {
              list = list.filter((item: any) => filter.val.includes(item[filter.col]));
            } else {
              list = list.filter((item: any) => item[filter.col] === filter.val);
            }
          }

          if (this.orderCol) {
            const c = this.orderCol;
            const asc = this.orderAscending;
            list.sort((a, b) => {
              if (a[c] < b[c]) return asc ? -1 : 1;
              if (a[c] > b[c]) return asc ? 1 : -1;
              return 0;
            });
          }

          if (this.limitVal !== null) {
            list = list.slice(0, this.limitVal);
          }

          if (this.singleResult || this.maybeSingleResult) {
            return list[0] || null;
          }
          return list;
        }

        // ------------------ STUDENTS TABLE ------------------
        if (this.tableName === 'students') {
          let students: any[] = JSON.parse(localStorage.getItem('mock_students') || '[]');

          // Handle insert
          if (this.valuesToInsert) {
            const rows = Array.isArray(this.valuesToInsert) ? this.valuesToInsert : [this.valuesToInsert];
            const inserted: any[] = [];
            for (const r of rows) {
              const newStud = {
                id: r.id || Math.random().toString(36).substring(2, 9) + '-' + Math.random().toString(36).substring(2, 9),
                college_id: r.college_id,
                name: r.name,
                email: r.email,
                department: r.department,
                year: r.year,
                status: r.status || 'Active',
                created_at: new Date().toISOString()
              };
              students.push(newStud);
              inserted.push(newStud);

              // Auto-create in mock_users & mock_user_profiles as a participant so they can log in
              const mockUsers: any[] = JSON.parse(localStorage.getItem('mock_users') || '[]');
              if (!mockUsers.some(u => u.email === newStud.email)) {
                // Find college name
                const colleges = JSON.parse(localStorage.getItem('mock_colleges') || '[]');
                const colName = colleges.find((c: any) => c.id === newStud.college_id)?.college_name || 'College';
                
                mockUsers.push({
                  id: newStud.id,
                  email: newStud.email,
                  password: 'password', // default student password
                  user_metadata: {
                    full_name: newStud.name,
                    role: 'participant',
                    college_name: colName,
                    department: newStud.department,
                    year_of_study: newStud.year
                  }
                });
                localStorage.setItem('mock_users', JSON.stringify(mockUsers));
              }
              const mockProfiles = JSON.parse(localStorage.getItem('mock_user_profiles') || '{}');
              mockProfiles[newStud.id] = {
                id: newStud.id,
                email: newStud.email,
                full_name: newStud.name,
                role: 'participant',
                created_at: new Date().toISOString()
              };
              localStorage.setItem('mock_user_profiles', JSON.stringify(mockProfiles));
            }
            localStorage.setItem('mock_students', JSON.stringify(students));
            return this.singleResult ? inserted[0] : inserted;
          }

          // Handle update
          if (this.valuesToUpdate) {
            let updatedRows: any[] = [];
            students = students.map(stud => {
              let match = true;
              for (const filter of this.filters) {
                if (filter.op === 'in') {
                  if (!filter.val.includes(stud[filter.col])) match = false;
                } else {
                  if (stud[filter.col] !== filter.val) match = false;
                }
              }
              if (match) {
                const updated = {
                  ...stud,
                  ...this.valuesToUpdate
                };
                updatedRows.push(updated);
                
                // Keep auth users in sync
                const mockUsers = JSON.parse(localStorage.getItem('mock_users') || '[]');
                const uIdx = mockUsers.findIndex((u: any) => u.id === stud.id);
                if (uIdx !== -1) {
                  mockUsers[uIdx].email = updated.email;
                  mockUsers[uIdx].user_metadata.full_name = updated.name;
                  mockUsers[uIdx].user_metadata.department = updated.department;
                  mockUsers[uIdx].user_metadata.year_of_study = updated.year;
                  localStorage.setItem('mock_users', JSON.stringify(mockUsers));
                }
                
                return updated;
              }
              return stud;
            });
            localStorage.setItem('mock_students', JSON.stringify(students));
            return this.singleResult ? updatedRows[0] : updatedRows;
          }

          // Handle delete
          if (this.isDelete) {
            students = students.filter(stud => {
              let match = true;
              for (const filter of this.filters) {
                if (filter.op === 'in') {
                  if (!filter.val.includes(stud[filter.col])) match = false;
                } else {
                  if (stud[filter.col] !== filter.val) match = false;
                }
              }
              if (match) {
                // Delete from auth users too
                const mockUsers = JSON.parse(localStorage.getItem('mock_users') || '[]');
                const filteredUsers = mockUsers.filter((u: any) => u.id !== stud.id);
                localStorage.setItem('mock_users', JSON.stringify(filteredUsers));
                
                const mockProfiles = JSON.parse(localStorage.getItem('mock_user_profiles') || '{}');
                delete mockProfiles[stud.id];
                localStorage.setItem('mock_user_profiles', JSON.stringify(mockProfiles));
                return false;
              }
              return true;
            });
            localStorage.setItem('mock_students', JSON.stringify(students));
            return [];
          }

          // Handle select
          let list = students;
          for (const filter of this.filters) {
            if (filter.op === 'in') {
              list = list.filter((item: any) => filter.val.includes(item[filter.col]));
            } else {
              list = list.filter((item: any) => item[filter.col] === filter.val);
            }
          }

          if (this.orderCol) {
            const c = this.orderCol;
            const asc = this.orderAscending;
            list.sort((a, b) => {
              if (a[c] < b[c]) return asc ? -1 : 1;
              if (a[c] > b[c]) return asc ? 1 : -1;
              return 0;
            });
          }

          if (this.limitVal !== null) {
            list = list.slice(0, this.limitVal);
          }

          if (this.singleResult || this.maybeSingleResult) {
            return list[0] || null;
          }
          return list;
        }

        return [];
      }
    }

    return new Proxy(client, {
      get(target, prop, receiver) {
        if (prop === 'auth') {
          return mockAuth
        }
        if (prop === 'from') {
          return (tableName: string) => {
            if (tableName === 'users' || tableName === 'colleges' || tableName === 'students') {
              return new MockQueryBuilder(tableName);
            }
            const origMethod = Reflect.get(target, prop, receiver);
            return origMethod.bind(target)(tableName);
          }
        }
        return Reflect.get(target, prop, receiver)
      }
    })
  }

  return client
}