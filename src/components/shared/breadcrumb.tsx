import { useNavigation } from '@/pages/api/context/navigation';
import Link from 'next/link';


const Breadcrumbs = () => {
      
    const { history, historyName } = useNavigation();

    const breadcrumbItems = history.slice(-4, -1).map((path, index) => {

      return { path, key: index };
    });

    const breadCrumbItemNames = historyName.slice(-4, -1).map((path, index) => {
      
      let name = path.split('/').pop()?.replace(/-/g, ' ') || 'Home';

      return { name, path, key: index };
    })

    return (
      <nav aria-label="breadcrumb" className="mt-36">
        <ol className={ breadcrumbItems.length > 0 ? `list-none p-0 pb-4 inline-flex items-center"` : 'hidden'}>
            <p className={`text-gray-500 pr-1`}>Recents Pages:</p>
            {breadcrumbItems.map(({ path, key }) => (
                <li key={key} className="">
                    <Link href={path}>
                        <span className="text-primary-main hover:text-primary-alt pl-1 pr-1 lowercase">{breadCrumbItemNames[key]?.name}</span>
                        <span className={key > 1 ? `hidden` : `text-gray-700`}> / </span>
                    </Link>
                </li>
            ))}
        </ol>
      </nav>
    );
  };

  export default Breadcrumbs;
