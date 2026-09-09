import { Link } from 'react-router-dom';

export default function EmptyState({ icon: Icon, title, description, actionText, actionLink }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon size={32} className="text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">{title}</h2>
      <p className="text-muted-foreground max-w-md mb-8">{description}</p>
      
      {actionText && actionLink && (
        <Link 
          to={actionLink} 
          className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors"
        >
          {actionText}
        </Link>
      )}
    </div>
  );
}
