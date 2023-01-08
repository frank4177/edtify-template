import * as React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
// import IconButton from "@mui/material/IconButton";
// import DeleteOutline from "@mui/icons-material/DeleteOutline";
import Container from "@mui/material/Container";
import Pagination from "@mui/material/Pagination";
import MuiTable from "@src/components/shared/table";
import AddSubscriber from "./addSubscriber";
import Empty from "@src/components/shared/state/Empty";
// import Delete from "../exam/manageExam/section/delete";
// import { useDialog } from "@src/hooks";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useToast } from "@src/utils/hooks";

interface SubscriberInt {
  surname: string;
  firstname: string;
  username: string;
  email: string;
  phoneNumber: string;
  id: string;
  userId: string;
}
interface SubscriberListInt {
  users: SubscriberInt[];
  pageCount: number;
}
export default function Subscribers({
  subscribers,
  centreId,
}: {
  subscribers: SubscriberListInt;
  centreId: string;
}) {
  const Toast = dynamic(() => import("@src/components/shared/toast"));
  const { toastMessage, toggleToast } = useToast();
  // const { isOpen, openDialog, closeDialog } = useDialog();
  const pageCount = subscribers.pageCount as number;
  const router = useRouter();
  const columns = [
    { minWidth: 50, name: "No", key: "index" },
    { minWidth: 150, name: "Surname", key: "surname" },
    { minWidth: 150, name: "First name", key: "firstname" },
    { minWidth: 50, name: "Username", key: "username" },
    { minWidth: 100, name: "Email", key: "email" },
    { minWidth: 70, name: "Phone Number", key: "phoneNumber" },
    // { minWidth: 50, name: "Action", key: "action" },
  ];
  const handleChange = () => {
    router.replace({
      query: { ...router.query },
    });
  };
  const result = subscribers.users.map((user, index: number) => ({
    index: ++index,
    ...user,
    // action: (
    //   <Delete
    //     closeDialog={closeDialog}
    //     isOpen={isOpen}
    //     toggleToast={toggleToast}
    //     url={`/centre/${centreId}/user/${user.userId}/remove`}
    //     updateData={handleChange}
    //   >
    //     <IconButton onClick={() => openDialog()}>
    //       <DeleteOutline htmlColor="red" />
    //     </IconButton>
    //   </Delete>
    // ),
  }));
  if (!subscribers) return <h1>....Loading</h1>;
  return (
    <Box
      component="section"
      sx={{ pt: 4, px: { md: 6 }, pb: 8 }}
      className="hero-section"
    >
      <Container maxWidth="xl">
        <Stack spacing={4} marginTop={4}>
          <Typography
            variant="h5"
            component="p"
            sx={{ textAlign: "center", fontSize: { xs: 25, md: 32 } }}
          >
            Centre Subscribers
          </Typography>

          <Typography>
            <AddSubscriber
              toggleToast={toggleToast}
              refetch={handleChange}
              centreId={centreId as string}
            />
          </Typography>

          {result.length ? (
            <Box sx={{ width: { xs: 400, md: "100%" } }}>
              <MuiTable data={result} columns={columns} bgColor="#F7F7F7" />
            </Box>
          ) : (
            <Empty />
          )}
        </Stack>
        <Stack py={4} direction="row" justifyContent="center" spacing={2}>
          {pageCount > 1 && (
            <Pagination
              count={pageCount}
              onChange={handleChange}
              shape="rounded"
              size="large"
            />
          )}
        </Stack>
        {toastMessage && (
          <Toast
            message={toastMessage}
            status={Boolean(toggleToast)}
            showToast={toggleToast}
          />
        )}
      </Container>
    </Box>
  );
}
