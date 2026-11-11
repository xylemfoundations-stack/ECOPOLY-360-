import React, { useState } from 'react';
import { SurveyRecord, PropertyRecord, Language } from '../../types/survey';
import { Building2, Plus, Trash2, Camera, Navigation, CheckCircle2 } from 'lucide-react';

interface Stage2Props {
  survey: SurveyRecord;
  onChange: (updated: SurveyRecord) => void;
  lang: Language;
}

export const Stage2PropertyLocation: React.FC<Stage2Props> = ({
  survey,
  onChange,
  lang
}) => {
  const [activePropertyId, setActivePropertyId] = useState<string>(
    survey.properties[0]?.id || 'PROP-01'
  );

  const activeProp =
    survey.properties.find((p) => p.id === activePropertyId) ||
    survey.properties[0];

  const updateActiveProperty = (field: keyof PropertyRecord, val: any) => {
    const updated = survey.properties.map((p) => {
      if (p.id === activePropertyId) {
        return { ...p, [field]: val };
      }
      return p;
    });
    onChange({ ...survey, properties: updated });
  };

  const addProperty = () => {
    const nextIndex = survey.properties.length + 1;
    const newId = `PROP-${nextIndex < 10 ? '0' + nextIndex : nextIndex}`;
    const newProp: PropertyRecord = {
      id: newId,
      name: `Property ${nextIndex}`,
      propertyType: 'Farm',
      propertyUsage: 'Agriculture',
      address: survey.address.villageTownWard || '',
      surveyNumber: '',
      subdivisionNumber: '',
      ownership: 'Owned',
      landExtent: '1',
      extentUnit: 'Acres',
      builtUpArea: '',
      cultivatedArea: '',
      occupantsCount: '',
      mainActivity: '',
      photos: []
    };
    onChange({
      ...survey,
      properties: [...survey.properties, newProp]
    });
    setActivePropertyId(newId);
  };

  const removeProperty = (idToRemove: string) => {
    if (survey.properties.length <= 1) {
      alert(
        lang === 'ta'
          ? 'குறைந்தபட்சம் ஒரு சொத்து விவரம் தேவைப்படுகிறது'
          : 'At least one property must be registered.'
      );
      return;
    }
    const updated = survey.properties.filter((p) => p.id !== idToRemove);
    onChange({ ...survey, properties: updated });
    if (activePropertyId === idToRemove) {
      setActivePropertyId(updated[0].id);
    }
  };

  const capturePropertyGPS = () => {
    if (!navigator.geolocation) {
      alert(lang === 'ta' ? 'GPS வசதி இல்லை' : 'Geolocation is not supported');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        updateActiveProperty('gpsCoordinates', {
          latitude: parseFloat(pos.coords.latitude.toFixed(6)),
          longitude: parseFloat(pos.coords.longitude.toFixed(6))
        });
      },
      (err) => {
        console.warn('GPS error:', err);
        // Fallback to respondent address coordinates or regional coords
        const fallback = survey.address.gpsCoordinates || {
          latitude: 10.795,
          longitude: 79.292
        };
        updateActiveProperty('gpsCoordinates', fallback);
      }
    );
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        const newPhoto = {
          id: `PHOTO-${Date.now()}`,
          dataUrl: reader.result,
          caption: `Property photo ${new Date().toLocaleTimeString()}`,
          timestamp: new Date().toISOString()
        };
        const currentPhotos = activeProp.photos || [];
        updateActiveProperty('photos', [...currentPhotos, newPhoto]);
      }
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = (photoId: string) => {
    const currentPhotos = activeProp.photos || [];
    updateActiveProperty(
      'photos',
      currentPhotos.filter((p) => p.id !== photoId)
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide">
            {lang === 'ta' ? 'படி 2: சொத்து & நில அமைவிடம்' : 'Stage 2: Property & Location Registration'}
          </div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mt-0.5">
            {lang === 'ta' ? 'பதிலளிப்பவரின் சொத்துக்கள் பட்டியல்' : 'Respondent Properties Management'}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            {lang === 'ta'
              ? 'ஒரு பதிலளிப்பவருக்கு பல சொத்துக்களை (வீடு, விவசாய நிலம், தொழிற்சாலை) இணைக்கலாம்.'
              : 'A single respondent may have multiple properties (residence, farm, business) within the same survey.'}
          </p>
        </div>

        <button
          type="button"
          onClick={addProperty}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-all shadow-xs self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{lang === 'ta' ? 'மற்றொரு சொத்து சேர்க்க' : 'Add Another Property'}</span>
        </button>
      </div>

      {/* Property Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {survey.properties.map((p, index) => {
          const isActive = p.id === activePropertyId;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActivePropertyId(p.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                isActive
                  ? 'bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-800 hover:border-slate-300'
              }`}
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>
                {p.name || `Property ${index + 1}`} ({p.id})
              </span>
            </button>
          );
        })}
      </div>

      {/* Property Details Form */}
      {activeProp && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                {activeProp.id}
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {lang === 'ta' ? 'சொத்து தகவல்கள்' : 'Property Record Configuration'}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={capturePropertyGPS}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'ta' ? 'சொத்து GPS பதிவு' : 'Capture GPS'}</span>
              </button>

              {survey.properties.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProperty(activeProp.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-200 text-rose-600 dark:border-rose-900/60 dark:text-rose-400 text-xs font-medium hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>{lang === 'ta' ? 'நீக்குக' : 'Delete'}</span>
                </button>
              )}
            </div>
          </div>

          {activeProp.gpsCoordinates && (
            <div className="p-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs flex items-center gap-2 text-slate-600 dark:text-slate-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Property GPS:</strong> Lat {activeProp.gpsCoordinates.latitude.toFixed(6)}, Long {activeProp.gpsCoordinates.longitude.toFixed(6)}
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {lang === 'ta' ? 'சொத்தின் பெயர் / குறிப்பு' : 'Property Alias / Label'}
              </label>
              <input
                type="text"
                value={activeProp.name}
                onChange={(e) => updateActiveProperty('name', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. Kaveri Basin Agricultural Land"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {lang === 'ta' ? 'சொத்து வகை (Property Type)' : 'Property Type'}
              </label>
              <select
                value={activeProp.propertyType}
                onChange={(e) => updateActiveProperty('propertyType', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Residence">{lang === 'ta' ? 'குடியிருப்பு (Residence)' : 'Residence'}</option>
                <option value="Farm">{lang === 'ta' ? 'விவசாயப் பண்ணை (Farm)' : 'Farm'}</option>
                <option value="Factory">{lang === 'ta' ? 'தொழிற்சாலை (Factory)' : 'Factory'}</option>
                <option value="Shop">{lang === 'ta' ? 'வணிகக் கடை (Shop)' : 'Shop'}</option>
                <option value="SHG premises">{lang === 'ta' ? 'சுய உதவிக் குழு வளாகம் (SHG premises)' : 'SHG premises'}</option>
                <option value="Institution">{lang === 'ta' ? 'கல்வி/பொது நிறுவனம் (Institution)' : 'Institution'}</option>
                <option value="Community land">{lang === 'ta' ? 'சமூக பொது நிலம் (Community land)' : 'Community land'}</option>
                <option value="Other">{lang === 'ta' ? 'மற்றவை (Other)' : 'Other'}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {lang === 'ta' ? 'சொத்து பயன்பாடு (Property Usage)' : 'Property Usage'}
              </label>
              <select
                value={activeProp.propertyUsage}
                onChange={(e) => updateActiveProperty('propertyUsage', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Residential">{lang === 'ta' ? 'குடியிருப்பு' : 'Residential'}</option>
                <option value="Agriculture">{lang === 'ta' ? 'விவசாயம்' : 'Agriculture'}</option>
                <option value="Commercial">{lang === 'ta' ? 'வணிகம்' : 'Commercial'}</option>
                <option value="Industrial">{lang === 'ta' ? 'தொழிற்துறை' : 'Industrial'}</option>
                <option value="Mixed">{lang === 'ta' ? 'கலப்பு பயன்பாடு' : 'Mixed'}</option>
                <option value="Vacant">{lang === 'ta' ? 'தரிசு / காலி இடம்' : 'Vacant'}</option>
                <option value="Community">{lang === 'ta' ? 'சமூக பயன்பாடு' : 'Community'}</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {lang === 'ta' ? 'சொத்து முகவரி (Property Address)' : 'Property Address'}
              </label>
              <input
                type="text"
                value={activeProp.address}
                onChange={(e) => updateActiveProperty('address', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. Plot 88, Vennar Canal Bank, Ammapettai"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {lang === 'ta' ? 'உரிமை நிலை (Ownership)' : 'Ownership'}
              </label>
              <select
                value={activeProp.ownership}
                onChange={(e) => updateActiveProperty('ownership', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Owned">{lang === 'ta' ? 'சொந்தமானது' : 'Owned'}</option>
                <option value="Leased">{lang === 'ta' ? 'குத்தகை' : 'Leased'}</option>
                <option value="Tenant">{lang === 'ta' ? 'வாடகை' : 'Tenant'}</option>
                <option value="Shared">{lang === 'ta' ? 'பங்குடமை' : 'Shared'}</option>
                <option value="Authorised use">{lang === 'ta' ? 'அங்கீகரிக்கப்பட்ட பயன்பாடு' : 'Authorised use'}</option>
                <option value="Community property">{lang === 'ta' ? 'சமூக சொத்து' : 'Community property'}</option>
                <option value="Unknown">{lang === 'ta' ? 'தெரியவில்லை' : 'Unknown'}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {lang === 'ta' ? 'நில சர்வே எண் (Land Survey Number)' : 'Land Survey Number'}
              </label>
              <input
                type="text"
                value={activeProp.surveyNumber}
                onChange={(e) => updateActiveProperty('surveyNumber', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. 142/3A"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {lang === 'ta' ? 'உட்பிரிவு எண் (Subdivision Number)' : 'Subdivision Number'}
              </label>
              <input
                type="text"
                value={activeProp.subdivisionNumber}
                onChange={(e) => updateActiveProperty('subdivisionNumber', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. 2B"
              />
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {lang === 'ta' ? 'நிலப்பரப்பு (Land Extent)' : 'Land Extent'}
                </label>
                <input
                  type="text"
                  value={activeProp.landExtent}
                  onChange={(e) => updateActiveProperty('landExtent', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                  placeholder="e.g. 4.5"
                />
              </div>
              <div className="w-32">
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {lang === 'ta' ? 'அலகு' : 'Unit'}
                </label>
                <select
                  value={activeProp.extentUnit}
                  onChange={(e) => updateActiveProperty('extentUnit', e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Acres">{lang === 'ta' ? 'ஏக்கர்' : 'Acres'}</option>
                  <option value="Hectares">{lang === 'ta' ? 'ஹெக்டேர்' : 'Hectares'}</option>
                  <option value="Cents">{lang === 'ta' ? 'சென்ட்' : 'Cents'}</option>
                  <option value="Square metres">{lang === 'ta' ? 'ச.மீ' : 'Sq. Metres'}</option>
                  <option value="Square feet">{lang === 'ta' ? 'ச.அடி' : 'Sq. Feet'}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {lang === 'ta' ? 'கட்டப்பட்ட பரப்பளவு (Built-up Area)' : 'Built-up Area (Optional)'}
              </label>
              <input
                type="text"
                value={activeProp.builtUpArea}
                onChange={(e) => updateActiveProperty('builtUpArea', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. 1850 sq.ft"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {lang === 'ta' ? 'சாகுபடி பரப்பளவு (Cultivated Area)' : 'Cultivated Area (Optional)'}
              </label>
              <input
                type="text"
                value={activeProp.cultivatedArea}
                onChange={(e) => updateActiveProperty('cultivatedArea', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. 4.2 Acres"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {lang === 'ta' ? 'பணியாளர்கள் / குடியிருப்போர் எண்ணிக்கை' : 'Occupants / Workers (Optional)'}
              </label>
              <input
                type="text"
                value={activeProp.occupantsCount}
                onChange={(e) => updateActiveProperty('occupantsCount', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. 5"
              />
            </div>

            <div className="sm:col-span-2 lg:col-span-3">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {lang === 'ta' ? 'முக்கிய செயல்பாடு (Main Activity)' : 'Main Activity on Property'}
              </label>
              <input
                type="text"
                value={activeProp.mainActivity}
                onChange={(e) => updateActiveProperty('mainActivity', e.target.value)}
                className="w-full px-3.5 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
                placeholder="e.g. Paddy cultivation, banana intercropping, vermicompost unit"
              />
            </div>
          </div>

          {/* Property Photographs */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-emerald-600" />
                <span>{lang === 'ta' ? 'சொத்து புகைப்படங்கள் (Property Photographs)' : 'Property Photographs'}</span>
              </label>

              <label className="cursor-pointer px-3 py-1.5 rounded-lg border border-emerald-600 text-emerald-600 dark:border-emerald-400 dark:text-emerald-400 text-xs font-semibold hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors flex items-center gap-1">
                <Camera className="w-3.5 h-3.5" />
                <span>{lang === 'ta' ? 'புகைப்படம் எடுக்க / பதிவேற்ற' : 'Take / Upload Photo'}</span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
            </div>

            {activeProp.photos && activeProp.photos.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {activeProp.photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="relative group border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden aspect-video bg-slate-100 dark:bg-slate-800"
                  >
                    <img
                      src={photo.dataUrl}
                      alt={photo.caption}
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(photo.id)}
                      className="absolute top-1.5 right-1.5 p-1 bg-rose-600 text-white rounded-md opacity-80 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <div className="absolute bottom-0 inset-x-0 bg-black/60 px-2 py-1 text-[10px] text-white truncate">
                      {photo.caption}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-center text-xs text-slate-400 dark:text-slate-500">
                {lang === 'ta'
                  ? 'புகைப்படங்கள் எதுவும் இணைக்கப்படவில்லை. புகைப்பட அனுமதியுடன் பதிவேற்றலாம்.'
                  : 'No photos captured yet for this property. Tap above to take or upload photos with consent.'}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
