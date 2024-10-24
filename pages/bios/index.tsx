import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: "/",
    permanent: false,
  },
});

const Bios = () => null;

export default Bios;
