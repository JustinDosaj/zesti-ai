import { useNavigation } from '@/pages/api/context/navigation';
import Link from 'next/link';


const Breadcrumbs = () => {
      
    const { history, historyName } = useNavigation();
    const breadcrumbItems = history.slice(-3).map((path, index) => {

      let name = path.split('/').pop()?.replace(/-/g, ' ') || 'Home';

      return { name, path, key: index };
    });

    const breadCrumbItemNames = historyName.slice(-3).map((path, index) => {
      
      let name = path.split('/').pop()?.replace(/-/g, ' ') || 'Home';

      return { name, path, key: index };
    })
  
    return (
      <nav aria-label="breadcrumb" className="mt-36">
        <ol className="list-none p-0 pb-4 inline-flex items-center">
            <p className="text-gray-500 pr-1">Recents Pages:</p>
            {breadcrumbItems.map(({ name, path, key }, index) => (
                <li key={key} className="">
                    { index < breadcrumbItems.length - 1 ?
                    <Link href={path}>
                        <span className="text-primary-main hover:text-primary-alt pl-1 pr-1 lowercase">{breadCrumbItemNames[index].name}</span>
                        <span className="text-gray-700"> / </span>
                    </Link>
                    :
                    <span className="text-gray-700 pl-2 lowercase">{breadCrumbItemNames[index].name}</span>
                    }
                </li>
            ))}
        </ol>
      </nav>
    );
  };

  export default Breadcrumbs;
