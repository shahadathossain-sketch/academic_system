



# Claude Code Agent Prompt — Next.js Practicum Project (P7, P9, P10, P11)

## Project Context

This is a **Next.js 14+ App Router** project with:
- **TypeScript** (strict mode)
- **Tailwind CSS** for styling
- **MongoDB** with **Mongoose** ODM
- **better-auth** for authentication
- **Zod** for validation
- **src/** directory structure

The project is an Academic Administration System (AAS) with pages for:
Certificates, Subjects, Students, and Group Students.

---

## IMPORTANT: Before you start

1. Read the existing file structure carefully with `ls -R src/`
2. Check existing files before creating new ones — avoid overwriting working code
3. The project uses `@/` alias pointing to `src/`
4. All API routes use `route.ts` files only — NO `page.tsx` in `app/api/`
5. Server components must NOT use `"use client"` — client components MUST have `"use client"` at top

---

## TASK 1 — Fix and complete TypeScript interfaces (src/types/)

Ensure these files exist and are correct:

### src/types/form-t.ts
```ts
export interface IOption {
  id: string
  title: string
}
```

### src/types/nav-t.ts
```ts
export interface INav {
  title: string
  slug: string
}
```

### src/types/shared-t.ts
```ts
type IError = { [key: string]: string[] }
export type IState = { isSaved: boolean; message?: string; errors?: IError }
```

### src/types/semester-t.ts
```ts
export interface ISemester {
  id: number
  name: string
}
```

### src/types/student-t.ts
```ts
export interface IStudent {
  id: number
  name: string
}

export interface IGroup {
  id: number
  name: string
}

export interface IStudentDto {
  id: number
  firstName: string
  lastName: string
  groupId: IGroup["id"]
  birthday: string
}
```

### src/types/subject-t.ts (simple version for semester page)
```ts
export interface ISubject {
  id: number
  title: string
}
```

### src/types/programme-t.ts
```ts
export type IId = string | undefined

export interface IFaculty {
  id: IId
  title: string
}

export interface IProgramme {
  id: IId
  title: string
  studyFormId: IId
  facultyId: IId
  subjects: ISubject[]
}

export interface ISubject {
  id: IId
  title: string
  programmes: IProgramme[]
}

export interface IProgrammeSubject {
  programmeId: IId
  subjectId: IId
}

export interface IStudyForm {
  id: IId
  title: string
}

export interface IOption {
  id: IId
  title: string
}
```

---

## TASK 2 — Create src/utils/server-api.ts

```ts
const SITE = `http://localhost:3000`

export const getApi = async <T>(
  url: string,
  options: Record<string, RequestInit> = {}
): Promise<T | undefined> => {
  const response = await fetch(`${SITE}${url}`, options)
  try {
    return await response.json()
  } catch (error) {
    console.log(error)
    return undefined
  }
}

export const postApi = async (url: string, body: object, method = "POST") => {
  const response = await fetch(`${SITE}${url}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  })
  return await response.json()
}

export const putApi = async (url: string, body: object) => {
  await postApi(url, body, "PUT")
}

export const deleteApi = async (url: string, id: string) => {
  await postApi(`${url}/${id}`, { id }, "DELETE")
}
```

---

## TASK 3 — Create Subjects page (Practicum 7)

### src/app/api/semesters/route.ts
```ts
import { ISemester } from "@/types/semester-t"
import { type NextRequest } from "next/server"

const semestersDb: ISemester[] = [
  { id: 1, name: "First" },
  { id: 2, name: "Second" },
  { id: 3, name: "Third" }
]

export function GET(request: NextRequest) {
  return Response.json(semestersDb)
}
```

### src/app/api/subjects/route.ts
```ts
import { ISubject } from "@/types/subject-t"
import { type NextRequest } from "next/server"

const subjectsDb: { [key: string]: ISubject[] } = {
  1: [
    { id: 1, title: "Math" },
    { id: 2, title: "English" }
  ],
  2: [
    { id: 3, title: "Object-Oriented Programming" },
    { id: 4, title: "Professional Language" }
  ],
  3: [
    { id: 5, title: "Networks" },
    { id: 6, title: "Databases" }
  ]
}

export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const semesterId = searchParams.get("semesterId") ?? ""
  const subjects = subjectsDb[semesterId] || []
  return Response.json(subjects)
}
```

### src/components/subjects/parts/semester-dropdown.tsx
Create a client component that:
- Fetches semesters from `/api/semesters` using useEffect
- Renders a `<select>` with onChange calling `setSemesterId(Number(e.target.value) || 0)`
- Props: `{ setSemesterId: (s: number) => void }`

### src/components/subjects/parts/subject-list.tsx
Create a client component that:
- Receives `{ semesterId: number }` as props
- Fetches subjects from `/api/subjects?semesterId=${semesterId}` when semesterId changes
- If !semesterId, clears the list
- Renders a `<ul>` with each subject title in a `<li>`

### src/components/subjects/semester-subjects.tsx
```tsx
"use client"
import { useState } from "react"
import { SemesterDropdown } from "./parts/semester-dropdown"
import { SubjectList } from "./parts/subject-list"

export function SemesterSubjects() {
  const [semesterId, setSemesterId] = useState<number>(0)
  return (
    <div className="grid grid-flow-row gap-y-8 max-w-sm">
      <SemesterDropdown setSemesterId={setSemesterId} />
      <SubjectList semesterId={semesterId} />
    </div>
  )
}
```

### src/app/subjects/page.tsx
```tsx
import { SemesterSubjects } from "@/components/subjects/semester-subjects"

export default function SubjectPage() {
  return (
    <div className="grid grid-flow-row gap-4">
      <h1 className="font-bold text-xl">Subjects of semester</h1>
      <SemesterSubjects />
    </div>
  )
}
```

---

## TASK 4 — Reusable parts components (Practicum 9)

### src/components/parts/submit-button.tsx
```tsx
"use client"
import { useFormStatus } from "react-dom"

export function SubmitButton({ name }: { name?: string }) {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-1 me-2 mb-2"
    >
      {name || "Add"}
    </button>
  )
}
```

### src/components/parts/text-field.tsx
Create a component with IProps: `{ label, name, isRequired, type?, defaultValue?, errors?: string[] }`
- Renders a label + input + error messages div

### src/components/parts/select.tsx
Create a component with IProps:
```ts
type IProps = {
  options: IOption[]
  selProps: {
    name: string
    label: string
    isRequired: boolean
    defaultValue?: string
    error?: string
  }
}
```
- Import IOption from `@/types/form-t`
- Manages local value state, syncs with defaultValue via useEffect
- Renders label + select + error div

### src/utils/form/select-helper.ts
```ts
import { IOption } from "@/types/form-t"

export const toSelArr = <T extends { id: number | string }>(
  arr: T[],
  titleKey: keyof T
): IOption[] =>
  arr.map((item) => ({
    id: String(item.id),
    title: item[titleKey] as string,
  }))
```

---

## TASK 5 — Mongoose models (src/models/)

### src/models/model-t.ts
```ts
export type WithStringId<T> = Omit<T, "id"> & { id: string }
```

### src/models/cert-type-model.ts
Create a Mongoose model with:
- Interface `ICertType { id: string; title: string }`
- Schema: `{ title: String }` with collection `"cert_types"`, `toJSON` transform to convert `_id` → `id`
- Export `CertType` model with `models.CertType || model("CertType", CertTypeSchema)`

### src/models/certificate-model.ts
Create a Mongoose model with:
- Interface `ICertificate { id?: string; typeId: string; company: string; isCreated?: boolean }`
- Interface `ICertificateWithType extends ICertificate { certType: ICertType }`
- Schema: `{ typeId: String, company: String, isCreated: Boolean }` collection `"certificates"`
- Same `toJSON` transform pattern

### src/models/programme-model.ts
Create Mongoose model for Programme with fields: `title: String, facultyId: ObjectId`
- Collection: `"programmes"`

### src/models/subject-model.ts (Mongoose version)
Create Mongoose model for Subject with fields: `title: String`
- Collection: `"subjects"`

---

## TASK 6 — MongoDB connection utility

### src/utils/mongoose-client.ts
If this file doesn't exist, create it:
```ts
import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI!

let cached = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

export async function connectMongoose() {
  if (cached.conn) return cached.conn
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose)
  }
  cached.conn = await cached.promise
  return cached.conn
}
```

---

## TASK 7 — Certificate services and API routes (Practicum 9)

### src/services/cert-type-service.ts
```ts
import { CertType, ICertType } from "@/models/cert-type-model"
import { connectMongoose } from "@/utils/mongoose-client"

export class CertTypeService {
  async getAll(): Promise<ICertType[]> {
    await connectMongoose()
    return await CertType.find()
  }
}
```

### src/services/certificate-service.ts
Create with methods:
- `getCertificates()` — find all, sort by company
- `saveCertificate(certificate: ICertificate)` — Certificate.create(certificate)
- `updateCertificate(certificate: ICertificate)` — updateOne by _id
- `deleteCertificate(id: string)` — deleteOne by _id (you need to implement this)

### src/app/api/classificators/certificates/route.ts
GET handler using CertTypeService.getAll()

### src/app/api/certificates/route.ts
- GET: getCertificates()
- POST: saveCertificate(await request.json())

### src/app/api/certificates/[certificateId]/route.ts
- PUT: updateCertificate(await request.json())
- DELETE: deleteCertificate(certificateId) — implement this fully

---

## TASK 8 — Certificate UI components

### src/actions/certificates.ts
Server action `createCertificates(prevState, formData)`:
- Validate with Zod: `{ id: z.coerce.string().optional(), typeId: z.coerce.string(), company: z.string().min(2) }`
- If no id → POST, else PUT
- Return IState

### src/components/certificates/list.tsx
Client component `CertList`:
- Props: `{ certTypes: ICertType[], certificates: ICertificate[], setEditCert: (cert: ICertificate) => void }`
- Renders a table with columns: Name (cert type title), Note (company), Actions (edit pencil + delete trash icon)
- Edit button calls `changeCert(c.id)` which calls `setEditCert(cert)`
- Delete button calls `deleteApi("/api/certificates", c.id!)` then refreshes list

### src/components/certificates/form-fields.tsx
Client component `FormFields` using `useActionState` with `createCertificates`

### src/components/certificates/form.tsx
Client component `Form` — shows an "Add" button with PlusIcon that opens a Modal

### src/components/certificates/wrapper.tsx
Client component `Wrapper`:
- Fetches certificates from API
- Manages `editCert` state
- Renders `<Form>` and `<CertList>`

### src/app/certificates/page.tsx
```tsx
import { Wrapper } from "@/components/certificates/wrapper"
import { ICertType } from "@/models/cert-type-model"
import { getApi } from "@/utils/server-api"

export default async function CertificatePage() {
  const certTypes = await getApi<ICertType[]>(`/api/classificators/certificates`)
  return <Wrapper certTypes={certTypes ?? []} />
}
```

---

## TASK 9 — Authentication (Practicum 10)

### src/utils/auth.ts
If not existing, create better-auth config:
```ts
import { betterAuth } from "better-auth"
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import { nextCookies } from "better-auth/next-js"
import mongoose from "mongoose"
import { connectMongoose } from "@/utils/mongoose-client"

await connectMongoose()
const mongoClient = mongoose.connection.getClient()
const db = mongoClient.db(process.env.MONGO_DB!)

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client: mongoClient,
    usePlural: true,
  }),
  emailAndPassword: { enabled: true },
  session: {
    expiresIn: 60 * 60,
    cookieCache: { enabled: true, maxAge: 5 * 60 }
  },
  user: {
    additionalFields: {
      name: { type: "string", required: false },
      role: { type: "string", required: false }
    }
  },
  plugins: [nextCookies()]
})

export type Session = typeof auth.$Infer.Session
```

### src/utils/auth-client.ts
```ts
import { createAuthClient } from "better-auth/react"
import { inferAdditionalFields } from "better-auth/client/plugins"

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  plugins: [
    inferAdditionalFields({
      user: {
        name: { type: "string" },
        role: { type: "string" }
      }
    })
  ]
})

export const { signIn, signUp, signOut, useSession } = authClient
```

### src/app/api/auth/[...all]/route.ts
```ts
import { auth } from "@/utils/auth"
import { toNextJsHandler } from "better-auth/next-js"

export const { POST, GET } = toNextJsHandler(auth)
```

### src/constants/role.ts
```ts
export enum Role {
  Administrator = "administrator",
  User = "user"
}
```

### src/actions/signup-action.ts, signin-action.ts, signout-action.ts
Create all three server actions using auth.api methods with proper Zod validation and error handling.

### src/utils/form/login-validator.ts
```ts
import z from "zod"

export const signInSchema = z.object({
  email: z.string({ error: "Email address is required" }).trim().pipe(z.email({ error: "Invalid email address" })),
  password: z.string({ error: "Password is required" }).min(8, { error: "Password must be at least 8 characters long" }).max(32, { error: "Password must be no more than 32 characters long" })
})

export const signUpSchema = signInSchema.extend({
  username: z.string({ error: "Username is required" }).min(2, { error: "Username must be at least 2 characters long" })
})
```

### src/components/auth/register.tsx and signIn.tsx
Create client components with forms using TextField, SubmitButton, useActionState.

### src/app/signup/page.tsx and src/app/signin/page.tsx
Simple server pages rendering auth components.

### proxy.ts (in project root, next to next.config.ts)
Protect `/admin/*` routes — redirect non-administrator users.

---

## TASK 10 — Group Students page (Practicum 11)

### src/models/group-model.ts
```ts
import { model, models, Schema, Model, Types } from "mongoose"
import { WithStringId } from "./model-t"

export interface IGroup {
  id: string
  name: string
}

type IReturnType = WithStringId<IGroup>

const GroupSchema = new Schema<IGroup>(
  { name: String },
  {
    timestamps: false,
    collection: "groups",
    strict: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (_doc: unknown, ret: IGroup & { _id: Types.ObjectId }): IReturnType => {
        const { _id, ...rest } = ret
        return { ...rest, id: _id.toString() }
      }
    }
  }
)

export const Group: Model<IGroup> = models.Group || model("Group", GroupSchema)
```

### src/models/group-student-model.ts
Create with interface `IGroupStudent { id: string; firstName: string; lastName: string; groupId: string }`
- Schema: `{ firstName: String, lastName: String, groupId: ObjectId }`
- Collection: `"group_students"`
- Same toJSON transform pattern

### src/services/group-service.ts
```ts
import { Group, IGroup } from "@/models/group-model"
import { connectMongoose } from "@/utils/mongoose-client"

export class GroupService {
  async getAll(): Promise<IGroup[]> {
    await connectMongoose()
    return await Group.find()
  }
}
```

### src/services/group-student-service.ts
```ts
import { GroupStudent, IGroupStudent } from "@/models/group-student-model"
import { connectMongoose } from "@/utils/mongoose-client"
import { Types } from "mongoose"

export class GroupStudentService {
  async getByGroup(groupId: string): Promise<IGroupStudent[]> {
    await connectMongoose()
    return await GroupStudent.find({ groupId: new Types.ObjectId(groupId) })
  }

  async delete(id: string): Promise<void> {
    await connectMongoose()
    await GroupStudent.deleteOne({ _id: new Types.ObjectId(id) })
  }
}
```

### src/app/api/groups/route.ts
GET handler using GroupService.getAll()

### src/app/api/group-students/[groupId]/route.ts
GET handler — return students by groupId using GroupStudentService.getByGroup(groupId)

### src/app/api/group-students/[groupId]/[studentId]/route.ts
DELETE handler — delete student by studentId

### src/components/students/student-list.tsx
Client component with:
- Props: `{ groups: IGroup[] }`
- State: `const [students, setStudents] = useState<IGroupStudent[]>()`
- A `<select>` dropdown displaying group names, values are group IDs
- `handleGroupClick(groupId: string)` — fetches `/api/group-students/${groupId}` and sets students state
- A Tailwind-styled table with columns: First Name, Last Name, Actions (delete button)
- Delete calls `/api/group-students/${groupId}/${student.id}` then refreshes list
- Filter students by selected group

### src/app/group-students/page.tsx
Server component:
- Fetch groups: `await getApi<IGroup[]>("/api/groups")`
- Render `<StudentList groups={groups ?? []} />`
- Title: "Group Students"

---

## TASK 11 — Admin page

### src/app/admin/users/page.tsx
Server component (protected by proxy.ts):
- Fetch users from MongoDB users collection (use a UserService or direct Mongoose query)
- Display in a table: name, email, role

### src/services/user-service.ts
```ts
import { connectMongoose } from "@/utils/mongoose-client"
import mongoose from "mongoose"

export class UserService {
  async getAll() {
    await connectMongoose()
    const db = mongoose.connection.db!
    return await db.collection("users").find({}).toArray()
  }
}
```

---

## TASK 12 — Seed MongoDB data

In MongoDB, create the following collections with data:

**groups** (3 documents):
```json
[
  { "name": "Group A" },
  { "name": "Group B" },
  { "name": "Group C" }
]
```

**group_students** (10 documents, spread across 3 groups using their ObjectIds):
Add firstName, lastName, and groupId for 10 students.

**cert_types** (2 documents):
```json
[
  { "title": "Study Certificate" },
  { "title": "Academic Leave" }
]
```

> Note: After seeding, check the groupIds match actual group _id values.

---

## TASK 13 — Navigation

Ensure the nav component links to all pages:
- `/` — Home
- `/subjects` — Subjects
- `/certificates` — Certificates
- `/group-students` — Group Students
- `/admin/users` — Admin (only shown when session.user.role === "administrator")

---

## TASK 14 — Environment variables

Ensure `.env` has:
```
MONGODB_URI=mongodb+srv://...
MONGO_DB=your_db_name
BETTER_AUTH_SECRET=your_secret_here
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## TASK 15 — Final checks

1. Run `npm run build` — fix all TypeScript errors
2. Test each route in the browser:
   - `http://localhost:3000/subjects` — select semester, see subjects
   - `http://localhost:3000/certificates` — add, edit, delete certificates
   - `http://localhost:3000/signup` — register a user
   - `http://localhost:3000/signin` — sign in
   - `http://localhost:3000/group-students` — select group, see students, delete
   - `http://localhost:3000/admin/users` — only accessible as administrator
3. In MongoDB, find your user in `users` collection and add `"role": "administrator"`
4. Test sign in/out and admin access

---

## Code style rules

- All server components are `async` and have NO `"use client"`
- All client components have `"use client"` as the very first line
- Use `"@/"` path alias for all imports from `src/`
- All Mongoose models use the `models.X || model("X", XSchema)` pattern to prevent duplicate model errors
- All API routes return `Response.json(data)`
- All server actions start with `"use server"` and return `Promise<IState>`
