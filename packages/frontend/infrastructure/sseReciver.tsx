import { useEffect, useRef } from "react";
import { useNotificationsVM } from "@/vm/view-model";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  url: string;
};

const FetchNotifications = ({ url }: Props) => {
  const eventSourceRef = useRef<EventSource | null>(null);
  const {count, addCount} = useNotificationsVM();
  const { toast } = useToast();

  useEffect(() => {
    const eventSource = new EventSource(url);
    console.log(`eventSource url: ${url} `);
    eventSourceRef.current = eventSource;

    const handleEvent = (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      toast({
        description: `${data.name}様がチェックインしました。`,
      })
      addCount(count);
    };

    eventSource.addEventListener('message', handleEvent);

    return () => {
      eventSource.removeEventListener('message', handleEvent);
      eventSource.close();
      eventSourceRef.current = null;
    };
  }, [url]);

  return (
    <>
      count: {count}
    </>
  );
};

export default FetchNotifications;
