import moment from "moment";

const logger = (req: any, res: any, next: any) => {
  console.log(
    `[${moment().format("YYYY-MM-DD hh:mm:ss")}]Endpoint ${
      req.protocol
    }://${req.get("host")}${req.originalUrl} hit`
  );
  next();
};

export default logger;
