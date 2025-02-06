import EventDispatcher from "./domain/@shared/event/event-dispatcher";
import CustomerChangedAddressEvent from "./domain/customer/event/customer-changed-address.event";
import EnviaConsoleLogHandler from "./domain/customer/event/handler/envia-console-log.handler";

const dispatcher = new EventDispatcher();
const enviaConsoleLog = new EnviaConsoleLogHandler(); 

dispatcher.register(CustomerChangedAddressEvent.name, (event: CustomerChangedAddressEvent) => {
    enviaConsoleLog.handle(event);
});